import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prismaClient';
import { Recipe } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import RecipeCard from './RecipeCard';

function NoRecipes() {
  return (
    <div className="max-w-2xl mx-auto p-10 md:p-16 bg-primary/10 rounded-xl flex flex-col gap-10 md:gap-16 items-center">
      <div className="flex gap-4 md:gap-8 text-inactive-recipes stroke-foreground-lighter/80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
          <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.83" />
          <path d="m3 11 7.77-6.04a2 2 0 0 1 2.46 0L21 11H3Z" />
          <path d="M12.97 19.77 7 15h12.5l-3.75 4.5a2 2 0 0 1-2.78.27Z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46" />
          <path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" />
          <path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <path d="M15 11h.01" />
          <path d="M11 15h.01" />
          <path d="M16 16h.01" />
          <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
          <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 md:w-16 md:h-16"
        >
          <circle cx="9" cy="7" r="2" />
          <path d="M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6" />
          <path d="M16 13H3" />
          <path d="M16 17H3" />
        </svg>
      </div>
      <p className="w-full text-inactive-recipes font-bold text-base md:text-xl text-center leading-relaxed">
        You have not created any recipes yet, add all your fan favorites now!
      </p>
    </div>
  );
}

export default async function Recipes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  let userRecipes: Recipe[] = [];
  try {
    userRecipes = await prisma.recipe.findMany({ where: { userId: session.user.id }, orderBy: { name: 'asc' } });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Your recipes</h2>
        <Link href="/recipes/new">
          <Button>Add recipe</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-4">
        {userRecipes.length ? userRecipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index} />) : <NoRecipes />}
      </div>
    </div>
  );
}
