import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import RegisterForm from '@/components/forms/RegisterForm';

export default async function Register() {
  const session = await getServerSession(authOptions);

  // Already logged in
  if (session) {
    redirect('/');
  }

  const providers = await getProviders();

  return (
    <div className="flex items-center justify-center h-screen">
      <RegisterForm providers={providers} />
    </div>
  );
}
