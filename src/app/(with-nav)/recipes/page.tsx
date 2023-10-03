import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Recipes() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Recipes page</h1>
      <p>{session.user?.email} is logged in</p>
      <Link href="/api/auth/signout">Logout</Link>
    </div>
  );
}
