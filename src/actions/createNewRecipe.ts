'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { recipeFormSchema } from '@/components/forms/RecipeForm';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function createNewRecipeAction(formValues: z.infer<typeof recipeFormSchema>) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();

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
