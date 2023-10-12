'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export function SideNav({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  function toggleMenu() {}

  // Close menu drawer after routing
  useEffect(() => {
    setMenuOpen(false);
  }, [router]);

  return (
    <>
      <aside
        id="menu-drawer"
        tabIndex={menuOpen ? 0 : -1}
        className={cn(
          'h-full w-full flex flex-col border-r-2 overflow-y-scroll z-30 transition duration-300 ease-in-out bg-white dark:bg-gray-900',
          className
        )}
      >
        <h1>Yes, Chef!</h1>

        <div className="flex flex-col gap-4 h-full">
          <Link href="/mealplan">
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mr-2 h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15V6"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12H3"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 6H3"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18H3"></path>
              </svg>
              <span>Mealplan</span>
            </Button>
          </Link>
          <Link href="/recipes">
            <Button className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mr-2 w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                />
              </svg>
              <span>Recipes</span>
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
