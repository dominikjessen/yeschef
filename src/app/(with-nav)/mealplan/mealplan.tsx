'use client';

import { getRandomRecipesAction } from '@/actions/getRandomRecipes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Recipe } from '@prisma/client';
import { HTMLAttributes, useEffect, useState } from 'react';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface MealplanCardProps extends HTMLAttributes<HTMLDivElement> {
  recipe: Recipe;
}

function MealplanCard({ recipe, className }: MealplanCardProps) {
  return (
    <div className={cn(className, 'bg-teal-500 grid grid-cols-1 gap-4 p-12')}>
      <div className="flex flex-col gap-8">
        <span>Roll die</span>
        <span>Lock</span>
        <span>Drag handle</span>
      </div>
      <span>{recipe.name}</span>
      <span>LINK</span>
    </div>
  );
}

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

  return (
    <>
      {!isLoading && (
        <div className="w-screen">
          <div className="bg-pink-300 flex gap-4 p-2">
            <span>Explanation text</span>
            <Button onClick={getNewRecipes}>Randomize</Button>
            <Button disabled={current === 0} onClick={() => setCurrent((curr) => curr - 1)}>
              Prev
            </Button>
            <Button disabled={current === mealplans.length - 1} onClick={() => setCurrent((curr) => curr + 1)}>
              Next
            </Button>
          </div>
          <div className={cn(`grid grid-cols-${numberOfRecipes} gap-2 place-items-center`)}>
            {DAYS_OF_WEEK.slice(0, numberOfRecipes).map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className={cn(`grid grid-cols-${numberOfRecipes} gap-2`)}>
            {!isLoading && mealplans[current] && mealplans[current].map((recipe) => <MealplanCard key={recipe.id} recipe={recipe} />)}
          </div>
        </div>
      )}
    </>
  );
}
