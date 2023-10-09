import { getServerSession } from 'next-auth';
import Mealplan from './mealplan';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function MealplanPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Debug</h1>
      <Mealplan userLoggedIn={session ? true : false} />
    </div>
  );
}
