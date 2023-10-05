'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { recipeFormSchema } from '@/components/forms/RecipeForm';
import prisma from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type CreateRecipeActionResponse = {
  success: boolean;
  error: Error | null;
};

export async function createNewRecipeAction(formValues: z.infer<typeof recipeFormSchema>): Promise<CreateRecipeActionResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return { success: false, error: new Error('Oops, something went wrong.') };
  }

  try {
    await prisma.recipe.create({
      data: {
        name: formValues.name,
        link: formValues.link ?? '',
        userId: session.user.id
      }
    });
  } catch (error) {
    return { success: false, error: error as Error };
  }

  revalidatePath('/recipes');

  return { success: true, error: null };
}
