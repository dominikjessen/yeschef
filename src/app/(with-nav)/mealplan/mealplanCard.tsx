import { cn } from '@/lib/utils';
import { Recipe } from '@prisma/client';
import { HTMLAttributes } from 'react';

export interface MealplanCardProps extends HTMLAttributes<HTMLDivElement> {
  recipe: Recipe;
}

export default function MealplanCard({ recipe, className }: MealplanCardProps) {
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
