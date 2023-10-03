import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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

  console.log(id);

  return (
    <div>
      <h1>Recipe {id}</h1>
      <Link href="/recipes">Back to recipes</Link>
    </div>
  );
}
