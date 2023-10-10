import { getServerSession } from 'next-auth';
import Mealplan from './mealplan';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export default async function MealplanPage() {
  const session = await getServerSession(authOptions);

  return <Mealplan userLoggedIn={session ? true : false} />;
}
