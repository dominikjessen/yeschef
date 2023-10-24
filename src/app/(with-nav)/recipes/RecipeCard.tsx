'use client';

import { Recipe } from '@prisma/client';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

export default function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const router = useRouter();

  function openRecipePage() {
    router.push(`/recipes/${recipe.id}`);
  }

  return (
    <motion.div
      className="h-20 flex justify-between gap-4 items-center border py-4 px-6 rounded-lg bg-card text-card-foreground hover:shadow hover:border-primary/30 hover:bg-primary/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 * index }}
      role="button"
      onClick={openRecipePage}
    >
      <h3 className="font-bold text-base md:text-xl line-clamp-2 grow">{recipe.name}</h3>
      <div className="flex gap-4 md:gap-6 items-center">
        {recipe.url && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={recipe.url} target="_blank" className="h-10 w-10 hover:bg-foreground/10 flex items-center justify-center rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to recipe source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </motion.div>
  );
}
