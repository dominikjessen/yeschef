'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { recipeFormSchema } from '@/components/forms/RecipeForm';
import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type UpdateRecipeActionResponse = {
  success: boolean;
  error: Error | null;
};

export async function updateExistingRecipeAction(recipeId: string, newValues: z.infer<typeof recipeFormSchema>): Promise<UpdateRecipeActionResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return { success: false, error: new Error('Oops, something went wrong.') };
  }

  try {
    await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        name: newValues.name,
        link: newValues.link ?? ''
      }
    });
  } catch (error) {
    return { success: false, error: error as Error };
  }

  revalidatePath('/recipes');

  return { success: true, error: null };
}
