'use client';

import { getRandomRecipesAction } from '@/actions/getRandomRecipes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMealplanStore } from '@/store/mealplanStore';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Recipe } from '@prisma/client';
import { HTMLAttributes } from 'react';
import { EdamamRecipe } from '@/types/edamam';
import { getRecipesFromEdamamAction } from '@/actions/getRecipesFromEdamam';
import { saveEdamamRecipeForUserAction } from '@/actions/saveEdamamRecipeForUser';
import { useEdamamStore } from '@/store/edamamStore';

export interface MealplanCardProps extends HTMLAttributes<HTMLDivElement> {
  recipe: Recipe | EdamamRecipe;
  recipeType: 'DB' | 'Edamam';
  index: number;
}

export default function MealplanCard({ recipe, index, recipeType, className }: MealplanCardProps) {
  // Mealplan store
  const mealplans = useMealplanStore((state) => state.mealplans);
  const current = useMealplanStore((state) => state.current);
  const lockStates = useMealplanStore((state) => state.lockStates);
  const useOwnRecipes = useMealplanStore((state) => state.useOwnRecipes);

  const toggleLockStateAtIndex = useMealplanStore((state) => state.toggleLockStateAtIndex);
  const getNewRecipeForIndex = useMealplanStore((state) => state.getNewRecipeForIndex);

  // Edamam store
  const recipeBacklog = useEdamamStore((state) => state.recipeBacklog);

  const takeFromBacklog = useEdamamStore((state) => state.takeFromBacklog);
  const addRecipesToBacklog = useEdamamStore((state) => state.addRecipesToBacklog);

  // Dndkit
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: `${index}` }); // NOTE: Needs to be string because of Dndkit and index 0
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  async function handleNewRecipeClicked() {
    if (useOwnRecipes) {
      const currentIds = (mealplans[current] as Recipe[]).map((recipe) => recipe.id);
      const { data: newRecipes } = await getRandomRecipesAction({ numberOfRecipes: 1, currentRecipes: currentIds });

      if (newRecipes?.length) {
        getNewRecipeForIndex(index, newRecipes[0]);
      }
    } else {
      if (1 <= recipeBacklog.length) {
        const newRecipes = takeFromBacklog(1);
        getNewRecipeForIndex(index, newRecipes[0]);
      } else {
        const { data: recipes } = await getRecipesFromEdamamAction({ mealType: ['Lunch', 'Dinner'], dishType: ['Main course'] });
        if (recipes) {
          addRecipesToBacklog(recipes.slice(1));
          getNewRecipeForIndex(index, recipes.slice(0, 1)[0]);
        }
      }
    }
  }

  // NOTE: I'm showing users this button as a nudge to create account. Should however be disabled if not signed in
  async function handleRecipeSavedClicked() {
    if (recipeType !== 'Edamam') return; // Should be impossible, safety net

    try {
      await saveEdamamRecipeForUserAction(recipe as EdamamRecipe);
      alert('Recipe saved successfully');
    } catch (error) {
      // TODO: This will throw an error if user isn't signed in -> Prompt to sign in
      alert(error);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(className, 'bg-teal-500 flex flex-col items-center gap-8 p-12 h-full cursor-default')}
    >
      <Button variant="icon" size="icon" onClick={handleNewRecipeClicked} disabled={lockStates[current][index]} aria-label="Get new random recipe">
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
      <Button variant="icon" size="icon" aria-label="Drag handle" {...listeners} disabled={lockStates[current][index]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <polyline points="18 8 22 12 18 16" />
          <polyline points="6 8 2 12 6 16" />
          <line x1="2" x2="22" y1="12" y2="12" />
        </svg>
      </Button>
      <Button
        variant="icon"
        size="icon"
        onClick={() => toggleLockStateAtIndex(index)}
        aria-label={lockStates[current][index] ? `Unlock recipe ${index + 1}` : `Lock recipe ${index + 1}`}
      >
        {lockStates[current][index] ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        )}
      </Button>
      <div className="flex gap-2">
        {recipe.url && (
          <a
            href={recipe.url}
            target="_blank"
            aria-label="Go to recipe url"
            className="p-2 h-10 w-10 hover:bg-foreground/10 flex items-center justify-center rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </a>
        )}
        {recipeType === 'Edamam' && (
          <Button onClick={handleRecipeSavedClicked} variant="icon" size="icon" title="Add to my recipes">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </Button>
        )}
      </div>

      <h3 className="line-clamp-2 font-bold text-lg text-center mt-auto">
        {recipeType === 'DB' ? (recipe as Recipe).name : recipeType === 'Edamam' ? (recipe as EdamamRecipe).label : ''}
      </h3>
    </div>
  );
}
