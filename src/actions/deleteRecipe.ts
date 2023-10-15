'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prismaClient';
import { Recipe } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export type DeleteUserSessionsResponse = {
  success: boolean;
  error: Error | null;
};

export async function deleteRecipeAction(recipe: Recipe): Promise<DeleteUserSessionsResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return { success: false, error: new Error('Oops, something went wrong.') };
  }

  try {
    await prisma.recipe.delete({
      where: { id: recipe.id }
    });
  } catch (error) {
    return { success: false, error: error as Error };
  }

  revalidatePath('/recipes');

  return { success: true, error: null };
}
