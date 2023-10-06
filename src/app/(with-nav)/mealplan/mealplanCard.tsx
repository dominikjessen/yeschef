import { getRandomRecipesAction } from '@/actions/getRandomRecipes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMealplanStore } from '@/store/mealplanStore';
import { Recipe } from '@prisma/client';
import { HTMLAttributes } from 'react';

export interface MealplanCardProps extends HTMLAttributes<HTMLDivElement> {
  recipe: Recipe;
  index: number;
}

export default function MealplanCard({ recipe, index, className }: MealplanCardProps) {
  // Zustand store
  const mealplans = useMealplanStore((state) => state.mealplans);
  const current = useMealplanStore((state) => state.current);
  const lockStates = useMealplanStore((state) => state.lockStates);
  const toggleLockStateAtIndex = useMealplanStore((state) => state.toggleLockStateAtIndex);
  const getNewRecipeForIndex = useMealplanStore((state) => state.getNewRecipeForIndex);

  async function handleNewRecipeClicked() {
    const currentIds = mealplans[current].map((recipe) => recipe.id);
    const { data: newRecipes } = await getRandomRecipesAction({ numberOfRecipes: 1, currentRecipes: currentIds });

    if (newRecipes?.length) {
      getNewRecipeForIndex(index, newRecipes[0]);
    }
  }

  return (
    <div className={cn(className, 'bg-teal-500 flex flex-col items-center gap-8 p-12 h-full')}>
      <Button variant="icon" size="icon" onClick={handleNewRecipeClicked} aria-label="Get new random recipe">
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
      <Button variant="icon" size="icon" onClick={() => toggleLockStateAtIndex(index)} aria-label="Lock this recipe">
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
      <span>Drag handle</span>
      {recipe.link && (
        <a
          href={recipe.link}
          target="_blank"
          aria-label="Go to recipe link"
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
      <h3 className="line-clamp-2 font-bold text-lg text-center mt-auto">{recipe.name}</h3>
    </div>
  );
}
