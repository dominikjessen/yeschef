'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prismaClient';
import { Recipe } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export type GetRandomRecipesActionResponse = {
  success: boolean;
  data: Recipe[] | null;
  error: Error | null;
};

export type GetRandomRecipesActionRequest = {
  numberOfRecipes?: number;
  currentRecipes?: string[];
};

export async function getRandomRecipesAction({
  numberOfRecipes = 1,
  currentRecipes = []
}: GetRandomRecipesActionRequest): Promise<GetRandomRecipesActionResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return { success: false, data: null, error: new Error('Oops, something went wrong.') };
  }

  try {
    const quotedArray = currentRecipes.map((element) => `'${element}'`);
    const resultString = quotedArray.join(',');

    const recipes =
      await prisma.$queryRaw`SELECT * FROM Recipe WHERE userId = ${session?.user.id} AND id NOT IN (${resultString}) ORDER BY RAND() LIMIT ${numberOfRecipes}`;

    revalidatePath('/mealplan');

    return { success: true, data: recipes as Recipe[], error: null };
  } catch (error) {
    return { success: false, data: null, error: error as Error };
  }
}
