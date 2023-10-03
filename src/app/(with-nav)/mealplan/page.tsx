import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';

export default async function Recipes() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Mealplan page</h1>
      <p>{session?.user?.email} is logged in</p>
      <Link href="/api/auth/signout">Logout</Link>
    </div>
  );
}
