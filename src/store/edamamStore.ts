import { EdamamRecipe } from '@/types/edamam';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type EdamamState = {
  recipeBacklog: EdamamRecipe[];
  addRecipesToBacklog: (recipes: EdamamRecipe[]) => void;
  takeFromBacklog: (takeFromFront: number) => EdamamRecipe[];
};

export const useEdamamStore = create<EdamamState>()(
  devtools(
    (set) => ({
      recipeBacklog: [],
      addRecipesToBacklog: (recipes) => set((state) => ({ recipeBacklog: [...state.recipeBacklog, ...recipes] })),
      takeFromBacklog: (takeFromFront) => {
        let fromFront: EdamamRecipe[] = [];
        set((state) => {
          fromFront = state.recipeBacklog.slice(0, takeFromFront);
          return { recipeBacklog: state.recipeBacklog.slice(takeFromFront) };
        });
        return fromFront;
      }
    }),
    { store: 'EdamamStore' }
  )
);
