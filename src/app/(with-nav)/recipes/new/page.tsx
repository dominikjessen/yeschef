import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import RecipeForm from '@/components/forms/RecipeForm';

export default async function NewRecipe() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <h1>Create new recipe</h1>
      <RecipeForm />
    </div>
  );
}
