'use client';

import { Recipe } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { deleteRecipeAction } from '@/actions/deleteRecipe';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useToast } from '@/hooks/useToast';

export default function ExistingRecipeTools({ recipe }: { recipe: Recipe }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  async function deleteRecipe() {
    startTransition(async () => {
      const { success, error } = await deleteRecipeAction(recipe);
      if (error) {
        toast({
          variant: 'destructive',
          description: 'Something went wrong. Please try again.'
        });
        return;
      }
      if (success) {
        router.push('/recipes');
        toast({
          variant: 'default', // NOTE: I like UX of default style for deletion but could be success too
          description: 'Successfully deleted recipe.'
        });
      }
    });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="icon"
            aria-label="Delete recipe"
            className="hover:bg-destructive/10 text-destructive"
            onClick={deleteRecipe}
            disabled={isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete recipe</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
