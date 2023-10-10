'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prismaClient';
import { getServerSession } from 'next-auth';

export type DeleteUserSessionsResponse = {
  success: boolean;
  error: Error | null;
};

export async function deleteUserSessionsAction(): Promise<DeleteUserSessionsResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return { success: false, error: new Error('Oops, something went wrong.') };
  }

  try {
    await prisma.session.deleteMany({
      where: { userId: session.user.id }
    });
  } catch (error) {
    return { success: false, error: error as Error };
  }

  return { success: true, error: null };
}
