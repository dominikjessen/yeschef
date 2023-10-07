import { EdamamRecipe } from '@/types/edamam';
import { Recipe } from '@prisma/client';
import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEdamamRecipe(recipe: EdamamRecipe | Recipe): recipe is EdamamRecipe {
  return 'label' in recipe;
}
