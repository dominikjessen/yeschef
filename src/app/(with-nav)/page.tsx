import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        <div>
          <h1>Home page</h1>
          <p>{session.user?.email} is logged in</p>
          <Link href="/api/auth/signout">Logout</Link>
        </div>
      ) : (
        <div>
          <h1>Landing page</h1>
          <Link href="/api/auth/signin">Login</Link>
        </div>
      )}
    </main>
  );
}
