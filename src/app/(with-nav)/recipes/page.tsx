import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function Recipes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const userRecipes = await prisma.recipe.findMany({ where: { userId: session.user.id }, orderBy: { name: 'asc' } });

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-bold text-2xl">Your recipes</h2>
      <div className="grid grid-cols-5 gap-4">
        {userRecipes.map((recipe) => (
          <div key={recipe.id} className="flex flex-col gap-6 items-center justify-center p-8 border border-primary shadow">
            <h3 className="font-bold text-xl">{recipe.name}</h3>
            {recipe.link && (
              <a href={recipe.link} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
