import { Recipe } from '@prisma/client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type MealplanState = {
  mealplans: Recipe[][];
  lockedRecipes: number[];
  current: number;
  undo: () => void;
  redo: () => void;
  initMealplans: (initialMealplan: Recipe[]) => void;
  addRandomMealplan: (newMealplan: Recipe[]) => void;
  removeOneRecipe: () => void;
  addOneRecipe: (newRecipe: Recipe) => void;
  lockSingleRecipe: (index: number) => void;
  unlockSingleRecipe: (index: number) => void;
};

export const useMealplanStore = create<MealplanState>()(
  devtools((set) => ({
    mealplans: [],
    lockedRecipes: [],
    current: 0,
    undo: () => set((state) => ({ current: state.current - 1 })),
    redo: () => set((state) => ({ current: state.current + 1 })),
    initMealplans: (initialMealplan) => set((state) => ({ mealplans: [initialMealplan] })),
    addRandomMealplan: (newMealplan) => set((state) => ({ mealplans: [...state.mealplans, newMealplan], current: state.mealplans.length })),
    removeOneRecipe: () =>
      set((state) => ({
        mealplans: [...state.mealplans, state.mealplans[state.current].slice(0, state.mealplans[state.current].length - 1)],
        current: state.mealplans.length
      })),
    addOneRecipe: (newRecipe) =>
      set((state) => ({ mealplans: [...state.mealplans, [...state.mealplans[state.current], newRecipe]], current: state.mealplans.length })),
    lockSingleRecipe: (index) => set((state) => ({ lockedRecipes: [...state.lockedRecipes, index] })),
    unlockSingleRecipe: (index) => set((state) => ({ lockedRecipes: state.lockedRecipes.filter((i) => i !== index) }))
  }))
);
