'use client';

import { getRandomRecipesAction } from '@/actions/getRandomRecipes';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Recipe } from '@prisma/client';
import { useEffect, useState } from 'react';
import MealplanCard from './mealplanCard';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialMealplan: Recipe[][] = [];
const initialNumberOfRecipes = 2;

export default function Mealplan() {
  const [isLoading, setIsLoading] = useState(true);
  const [mealplans, setMealplans] = useState(initialMealplan);
  const [current, setCurrent] = useState(0);
  const [numberOfRecipes, setNumberOfRecipes] = useState(initialNumberOfRecipes);

  async function getNewRecipes() {
    const currentIds = mealplans[current].map((recipe) => recipe.id);
    const res = await getRandomRecipesAction({ numberOfRecipes: numberOfRecipes, currentRecipes: currentIds });
    if (res.data) {
      setMealplans((prev) => [...prev, res.data as Recipe[]]);
      setCurrent(mealplans.length); // Always go to end of list when randomized
    }
  }

  async function removeOneRecipe() {
    const currMealplan = mealplans[current];
    setMealplans((prev) => [...prev, [...currMealplan.slice(0, currMealplan.length - 1)]]);
    setCurrent(mealplans.length);
  }

  async function addOneRecipe() {
    const currentIds = mealplans[current].map((recipe) => recipe.id);
    const { data: newRecipe } = await getRandomRecipesAction({ numberOfRecipes: 1, currentRecipes: currentIds });
    if (newRecipe) {
      const currMealplan = mealplans[current];

      // Add single recipe to current mealplan and add to end of history
      setMealplans((prev) => [...prev, [...currMealplan, ...(newRecipe as Recipe[])]]);
      setCurrent(mealplans.length);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const getInitialRecipes = async () => {
      const res = await getRandomRecipesAction({ numberOfRecipes: initialNumberOfRecipes });

      if (res.data) {
        setMealplans([res.data]);
      }
    };

    getInitialRecipes();
    setIsLoading(false);
  }, []);

  // TODO: Determine if effect is the best choice here
  useEffect(() => {
    if (mealplans[current]) {
      setNumberOfRecipes(mealplans[current].length);
    }
  }, [mealplans, current]);

  return (
    <>
      {!isLoading && (
        <div className="w-screen">
          {/* Menu Bar */}
          <div className="border flex gap-8 p-2">
            <span className="grow">Explanation text</span>
            <Button variant="icon" size="icon" onClick={getNewRecipes} aria-label="Randomize recipes">
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
            <Separator orientation="vertical" />
            <div className="flex gap-4">
              <Button variant="icon" size="icon" onClick={() => setCurrent((curr) => curr - 1)} disabled={current === 0} aria-label="Undo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </Button>
              <Button
                variant="icon"
                size="icon"
                onClick={() => setCurrent((curr) => curr + 1)}
                disabled={current === mealplans.length - 1}
                aria-label="Redo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>
              </Button>
            </div>
            <Separator orientation="vertical" />
            <div className="flex gap-4">
              <Button variant="icon" size="icon" onClick={removeOneRecipe} disabled={numberOfRecipes === 0} aria-label="Remove one day">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
              </Button>
              <Button variant="icon" size="icon" onClick={addOneRecipe} disabled={numberOfRecipes === 7} aria-label="Add one day">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Days of Week header */}
          <div className={cn(`grid grid-cols-${numberOfRecipes} gap-2 place-items-center`)}>
            {DAYS_OF_WEEK.slice(0, numberOfRecipes).map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Recipes */}
          <div className={cn(`grid grid-cols-${numberOfRecipes} gap-2`)}>
            {mealplans[current] && mealplans[current].map((recipe, index) => <MealplanCard key={`${index}-${recipe.id}`} recipe={recipe} />)}
          </div>
        </div>
      )}
    </>
  );
}
