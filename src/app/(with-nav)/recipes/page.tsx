import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prismaClient';
import { Recipe } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Your recipes</h2>
        <Link href="/recipes/new">
          <Button>Add recipe</Button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {userRecipes.length ? (
          userRecipes.map((recipe) => (
            <div key={recipe.id} className="flex flex-col gap-6 items-center justify-center p-8 border border-primary shadow">
              <h3 className="font-bold text-xl">{recipe.name}</h3>
              {recipe.url && (
                <a href={recipe.url} target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
              )}
              <Link href={`/recipes/${recipe.id}`}>
                <Button variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <span className="ml-2">Edit recipe</span>
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <div>No recipes yet, add some now!</div>
        )}
      </div>
    </div>
  );
}
