import { EdamamRecipe } from '@/types/edamam';
import { Recipe } from '@prisma/client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MealplanState = {
  mealplans: (Recipe | EdamamRecipe)[][];
  lockStates: boolean[][];
  current: number;
  useOwnRecipes: boolean;
  undo: () => void;
  redo: () => void;
  initMealplans: (initialMealplan: (Recipe | EdamamRecipe)[]) => void;
  addRandomMealplan: (newMealplan: (Recipe | EdamamRecipe)[]) => void;
  removeOneRecipe: () => void;
  addOneRecipe: (newRecipe: Recipe | EdamamRecipe) => void;
  toggleLockStateAtIndex: (index: number) => void;
  getNewRecipeForIndex: (index: number, newRecipe: Recipe | EdamamRecipe) => void;
  setOwnRecipes: (checked: boolean) => void;
};

export const useMealplanStore = create<MealplanState>()(
  devtools(
    (set) => ({
      mealplans: [],
      lockStates: [],
      current: 0,
      useOwnRecipes: false,
      undo: () => set((state) => ({ current: state.current - 1 })),
      redo: () => set((state) => ({ current: state.current + 1 })),
      initMealplans: (initialMealplan) =>
        set((_state) => ({ mealplans: [initialMealplan], lockStates: [Array(initialMealplan.length).fill(false)] })),
      addRandomMealplan: (newMealplan) =>
        set((state) => ({
          mealplans: [...state.mealplans, newMealplan],
          current: state.mealplans.length,
          lockStates: [...state.lockStates, [...state.lockStates[state.lockStates.length - 1]]]
        })),
      removeOneRecipe: () =>
        set((state) => ({
          mealplans: [...state.mealplans, state.mealplans[state.current].slice(0, state.mealplans[state.current].length - 1)],
          current: state.mealplans.length,
          lockStates: [...state.lockStates, state.lockStates[state.current].slice(0, -1)]
        })),
      addOneRecipe: (newRecipe) =>
        set((state) => ({
          mealplans: [...state.mealplans, [...state.mealplans[state.current], newRecipe]],
          current: state.mealplans.length,
          lockStates: [...state.lockStates, [...state.lockStates[state.current], false]]
        })),
      toggleLockStateAtIndex: (index) =>
        set((state) => ({
          lockStates: [...state.lockStates.slice(0, -1), state.lockStates[state.current].map((value, i) => (i === index ? !value : value))]
        })),
      getNewRecipeForIndex: (index, newRecipe) =>
        set((state) => {
          return {
            mealplans: [...state.mealplans, state.mealplans[state.current].map((recipe, i) => (i === index ? newRecipe : recipe))],
            current: state.mealplans.length,
            lockStates: [...state.lockStates, [...state.lockStates[state.lockStates.length - 1]]]
          };
        }),
      setOwnRecipes: (checked) => set((_state) => ({ useOwnRecipes: checked }))
    }),
    { store: 'MealplanStore' }
  )
);
