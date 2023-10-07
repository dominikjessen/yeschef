'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prismaClient';
import { EdamamRecipe } from '@/types/edamam';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export type SaveEdamamRecipeActionResponse = {
  success: boolean;
  error: Error | null;
};

export async function saveEdamamRecipeForUserAction(recipe: EdamamRecipe): Promise<SaveEdamamRecipeActionResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return { success: false, error: new Error('Oops, something went wrong.') };
  }

  try {
    await prisma.recipe.create({
      data: {
        name: recipe.label,
        url: recipe.url,
        userId: session.user.id
      }
    });
  } catch (error) {
    return { success: false, error: error as Error };
  }

  revalidatePath('/recipes');

  return { success: true, error: null };
}
