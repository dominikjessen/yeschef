'use client';

import { Session } from 'next-auth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown';
import { deleteUserSessionsAction } from '@/actions/deleteUserSessions';
import { useRouter } from 'next/navigation';

export default function HeaderDropdown({ session }: { session: Session }) {
  const router = useRouter();

  async function signOut() {
    const { success } = await deleteUserSessionsAction();
    if (success) {
      router.refresh();
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-1 md:gap-2 items-center p-2 rounded hover:bg-border/40 text-sm text-foreground/80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 stroke-foreground/80"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="hidden md:block">{session.user.email}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hidden md:block w-4 h-4 stroke-foreground/50 "
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuItem onClick={signOut} className="cursor-pointer rounded-sm hover:bg-border/30">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
