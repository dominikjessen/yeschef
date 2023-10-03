import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import RecipeForm from '@/components/forms/RecipeForm';
import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export type RecipePageProps = {
  params: {
    id: string;
  };
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const recipe = await prisma.recipe.findFirst({ where: { id: id } });

  if (!recipe) {
    redirect('/recipes');
  }
  console.log(recipe);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1>Recipe {id}</h1>
        <Link href="/recipes">Back to recipes</Link>
      </div>
      <RecipeForm recipe={recipe} />
    </div>
  );
}
