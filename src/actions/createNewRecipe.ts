'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { recipeFormSchema } from '@/components/forms/RecipeForm';
import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createNewRecipeAction(formValues: z.infer<typeof recipeFormSchema>) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return;
  }

  await prisma.recipe.create({
    data: {
      name: formValues.name,
      link: formValues.link ?? '',
      userId: session.user.id
    }
  });

  revalidatePath('/recipes');
}
