import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AccountDropdown from './AccountDropdown';
import { Button } from '../ui/button';

export default async function Header({ className }: { className?: string }) {
  const session = await getServerSession(authOptions);

  return (
    <header className={cn('sticky top-0 z-40 py-2 bg-background/90 backdrop-blur border-b flex justify-between items-center', className)}>
      <h2>Y,C!</h2>
      <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20">
        <Link href="/mealplan">
          <Button variant="secondary" size="sm">
            Mealplan
          </Button>
        </Link>
        {session ? (
          <Link href="/recipes">
            <Button variant="secondary" size="sm">
              Recipes
            </Button>
          </Link>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-foreground/60">Recipes</span>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={6}>
                <p>Sign in to manage your recipes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {session ? (
        <AccountDropdown session={session} />
      ) : (
        <Link href="/api/auth/signin">
          <Button size="sm">Login</Button>
        </Link>
      )}
    </header>
  );
}
