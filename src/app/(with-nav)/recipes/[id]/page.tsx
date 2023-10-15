import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import RecipeForm from '@/components/forms/RecipeForm';
import prisma from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ExistingRecipeTools from './ExistingRecipeTools';

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Link
          href="/recipes"
          className="-mt-2 md:-mt-6 p-2 w-fit flex gap-2 items-center text-foreground/70 hover:text-foreground rounded hover:bg-foreground/10 transition duration-200 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
          </svg>
          <span className="text-xs md:text-sm">Back to recipes</span>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-bold text-2xl">{recipe.name}</h2>
          <ExistingRecipeTools session={session} recipe={recipe} />
        </div>
      </div>
      <RecipeForm recipe={recipe} />
    </div>
  );
}
