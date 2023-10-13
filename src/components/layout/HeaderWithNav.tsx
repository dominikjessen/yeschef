import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SideNav } from './SideNav';

// This component basically just exists to pass Session to client components
export default async function HeaderWithNav({ headerClassName, navClassName }: { headerClassName?: string; navClassName?: string }) {
  const session = await getServerSession(authOptions);

  return <SideNav session={session} className={navClassName} headerClassName={headerClassName} />;
}
