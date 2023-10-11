'use client';

import { getRandomRecipesAction } from '@/actions/getRandomRecipes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn, isEdamamRecipe } from '@/lib/utils';
import { Recipe } from '@prisma/client';
import { useEffect, useState } from 'react';
import MealplanCard from './mealplanCard';
import { useMealplanStore } from '@/store/mealplanStore';
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getRecipesFromEdamamAction } from '@/actions/getRecipesFromEdamam';
import { EdamamRecipe } from '@/types/edamam';
import { useEdamamStore } from '@/store/edamamStore';
import { ToggleButton, ToggleButtonOption } from '@/components/ui/toggleButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useMediaQuery from '@/hooks/useMediaQuery';

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const INITIAL_NUMBER_OF_RECIPES = 5;

type MealplanProps = {
  userLoggedIn: boolean;
};

export default function Mealplan({ userLoggedIn }: MealplanProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [randomizeButtonLoading, setRandomizeButtonLoading] = useState(false);
  const [cardsShouldAnimate, setCardsShouldAnimate] = useState(true);

  const canUseColumns = useMediaQuery('(min-width: 768px)'); // This is Tailwind's MD

  // Zustand mealplan store
  const mealplans = useMealplanStore((state) => state.mealplans);
  const current = useMealplanStore((state) => state.current);
  const lockStates = useMealplanStore((state) => state.lockStates);
  const useOwnRecipes = useMealplanStore((state) => state.useOwnRecipes);

  const undo = useMealplanStore((state) => state.undo);
  const redo = useMealplanStore((state) => state.redo);
  const initMealplans = useMealplanStore((state) => state.initMealplans);
  const addNewMealplan = useMealplanStore((state) => state.addRandomMealplan);
  const addOneRecipe = useMealplanStore((state) => state.addOneRecipe);
  const removeOneRecipe = useMealplanStore((state) => state.removeOneRecipe);
  const setUseOwnRecipes = useMealplanStore((state) => state.setOwnRecipes);

  // Zustand edamam store
  const recipeBacklog = useEdamamStore((state) => state.recipeBacklog);
  const addRecipesToBacklog = useEdamamStore((state) => state.addRecipesToBacklog);
  const takeFromBacklog = useEdamamStore((state) => state.takeFromBacklog);

  // Dndkit
  const [itemDragging, setItemDragging] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function recipeSourceToggleChanged(value: string) {
    if (value === 'edamam') {
      setUseOwnRecipes(false);
    } else if (value === 'db') {
      setUseOwnRecipes(true);
    }
  }

  async function handleRandomizeClicked() {
    setRandomizeButtonLoading(true);
    setCardsShouldAnimate(true);

    if (useOwnRecipes) {
      const currentIds = mealplans[current].map((recipe) => (recipe as Recipe).id);
      const res = await getRandomRecipesAction({ numberOfRecipes: mealplans[current].length, currentRecipes: currentIds });
      if (res.data) {
        addNewMealplan(res.data as Recipe[]);
      }
    } else {
      const newRecipesNeeded = mealplans[current].length - lockStates[current].filter((value) => !!value).length;

      if (newRecipesNeeded <= recipeBacklog.length) {
        const newRecipes = takeFromBacklog(newRecipesNeeded);
        addNewMealplan(newRecipes);
      } else {
        const { data: recipes } = await getRecipesFromEdamamAction({ mealType: ['Lunch', 'Dinner'], dishType: ['Main course'] });
        if (recipes) {
          addRecipesToBacklog(recipes.slice(newRecipesNeeded));
          addNewMealplan(recipes.slice(0, newRecipesNeeded));
        }
      }
    }
  }

  async function handleAddOneClicked() {
    setCardsShouldAnimate(false);

    if (useOwnRecipes) {
      const currentIds = mealplans[current].map((recipe) => (recipe as Recipe).id);
      const { data: newRecipe } = await getRandomRecipesAction({ numberOfRecipes: 1, currentRecipes: currentIds });
      if (newRecipe) {
        addOneRecipe(newRecipe[0]);
      }
    } else {
      const newRecipesNeeded = 1;

      if (newRecipesNeeded <= recipeBacklog.length) {
        const newRecipes = takeFromBacklog(newRecipesNeeded);
        addOneRecipe(newRecipes[0]);
      } else {
        const { data: recipes } = await getRecipesFromEdamamAction({ mealType: ['Lunch', 'Dinner'], dishType: ['Main course'] });
        if (recipes) {
          addRecipesToBacklog(recipes.slice(newRecipesNeeded));
          addOneRecipe(recipes.slice(0, newRecipesNeeded)[0]);
        }
      }
    }
  }

  function onDragEnd(e: DragEndEvent) {
    setCardsShouldAnimate(false);
    setItemDragging(false);

    const fromIndex = e.active.id;
    const toIndex = e.over ? e.over.id : null;

    if (toIndex === null || fromIndex === toIndex) return; // No valid moving done

    // Create a new mealplan for state with new positions (so user can undo)
    // NOTE: Number casts only works because I use index as string for Dndkit items
    const copiedCurrentMealplan = [...mealplans[current]];
    const elementToMove = copiedCurrentMealplan.splice(+fromIndex, 1)[0];
    copiedCurrentMealplan.splice(+toIndex, 0, elementToMove);

    addNewMealplan(copiedCurrentMealplan);
  }

  useEffect(() => {
    const getInitialRecipes = async () => {
      if (useOwnRecipes) {
        const res = await getRandomRecipesAction({ numberOfRecipes: INITIAL_NUMBER_OF_RECIPES });

        if (res.data) {
          initMealplans(res.data);
        }
      } else {
        const { data: recipes } = await getRecipesFromEdamamAction({ mealType: ['Lunch', 'Dinner'], dishType: ['Main course'] }); // TODO: Remove!!

        if (recipes) {
          addRecipesToBacklog(recipes.slice(INITIAL_NUMBER_OF_RECIPES));
          initMealplans(recipes.slice(0, INITIAL_NUMBER_OF_RECIPES));
        }
      }
    };

    // Only runs once on page load
    if (isLoading) {
      getInitialRecipes().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading, initMealplans, useOwnRecipes, addRecipesToBacklog]);

  return (
    <>
      {!isLoading && (
        <div className="w-full h-full flex flex-col gap-2">
          {/* Menu Bar */}
          <div className={cn('flex items-center gap-2 sm:gap-4 lg:gap-8 py-4 h-16', canUseColumns ? 'self-end' : 'self-center my-5')}>
            <ToggleButton name="Recipe source" value={useOwnRecipes ? 'db' : 'edamam'} onValueChange={recipeSourceToggleChanged}>
              <ToggleButtonOption value="edamam" className="text-xs md:text-sm">
                Online recipes
              </ToggleButtonOption>
              <ToggleButtonOption value="db" className="text-xs md:text-sm" disabled={!userLoggedIn}>
                Your recipes
              </ToggleButtonOption>
            </ToggleButton>
            <Separator orientation="vertical" className={canUseColumns ? '' : 'ml-1'} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={randomizeButtonLoading ? 'animate-rollDice' : ''}
                    variant="icon"
                    size="icon"
                    onClick={handleRandomizeClicked}
                    disabled={randomizeButtonLoading}
                    onAnimationEnd={() => setRandomizeButtonLoading(false)}
                    aria-label="Randomize recipes"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <rect className="w-5 h-5" x="2" y="2" rx="2" ry="2" />
                      <path d="M16 8h.01" />
                      <path d="M8 8h.01" />
                      <path d="M8 16h.01" />
                      <path d="M16 16h.01" />
                      <path d="M12 12h.01" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Randomize recipes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" />
            <div className="flex gap-2 md:gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="icon"
                      size="icon"
                      onClick={() => {
                        setCardsShouldAnimate(false);
                        undo();
                      }}
                      disabled={current === 0}
                      aria-label="Undo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Undo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="icon"
                      size="icon"
                      onClick={() => {
                        setCardsShouldAnimate(false);
                        redo();
                      }}
                      disabled={current === mealplans.length - 1}
                      aria-label="Redo"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Redo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-2 md:gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="icon"
                      size="icon"
                      onClick={() => {
                        setCardsShouldAnimate(false);
                        removeOneRecipe();
                      }}
                      disabled={mealplans[current].length <= 1}
                      aria-label="Remove one day"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove recipe</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="icon"
                      size="icon"
                      onClick={handleAddOneClicked}
                      disabled={mealplans[current].length >= 7}
                      aria-label="Add one day"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add recipe</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Mealplan */}
          <div
            className={cn(
              'grid gap-2 md:gap-4 place-items-center',
              canUseColumns
                ? `grid-cols-${mealplans[current].length}`
                : `grid-flow-col grid-cols-[repeat(2,fit_content(100%))] grid-rows-${mealplans[current].length}`,
              itemDragging && 'touch-none'
            )}
          >
            {/* Days of Week header */}
            {DAYS_OF_WEEK.slice(0, mealplans[current].length).map((day) => (
              <div key={day} className="font-bold text-base md:text-2xl">
                {canUseColumns ? day : day.charAt(0)}
              </div>
            ))}

            {/* Recipes (dnd area) */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={() => setItemDragging(true)}>
              <SortableContext
                items={mealplans[current].map((_recipe, index) => `${index}`)}
                strategy={canUseColumns ? horizontalListSortingStrategy : verticalListSortingStrategy}
              >
                {mealplans[current] &&
                  mealplans[current].map((recipe, index) => (
                    <MealplanCard
                      key={isEdamamRecipe(recipe) ? `${index}-${(recipe as EdamamRecipe).uri}` : `${index}-${(recipe as Recipe).id}`}
                      recipe={recipe}
                      recipeType={isEdamamRecipe(recipe) ? 'Edamam' : 'DB'}
                      index={index}
                      cardShouldAnimate={cardsShouldAnimate}
                      onRecipeRandomized={() => setCardsShouldAnimate(true)}
                      orientation={canUseColumns ? 'vertical' : 'horizontal'}
                      userLoggedIn={userLoggedIn}
                    />
                  ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}
    </>
  );
}
