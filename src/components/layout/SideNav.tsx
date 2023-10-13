'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { Session } from 'next-auth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import AccountDropdown from './AccountDropdown';

export function SideNav({ session, headerClassName }: { session: Session | null; headerClassName?: string }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathName = usePathname();

  function openMenuMobile() {
    document.body.style.overflowY = 'hidden';
    setMenuOpen(true);
    setMobileMenuOpen(true);
  }

  function closeMenu() {
    document.body.style.overflowY = 'auto';
    setMenuOpen(false);
    setMobileMenuOpen(false);
  }

  // Close menu drawer after routing
  useEffect(() => {
    closeMenu();
  }, [pathName]);

  return (
    <>
      <aside
        id="menu-drawer"
        tabIndex={menuOpen ? 0 : -1}
        className={cn(
          'h-screen w-full sticky top-0 bg-background border-r py-2 flex flex-col items-center z-30 transition duration-300 ease-in-out',
          // Layout dependent styles
          'hidden md:flex col-span-1 row-span-2',
          // Mobile menu fixed outside of grid
          mobileMenuOpen ? 'fixed z-50 flex w-4/6 shadow py-10' : ''
        )}
      >
        {menuOpen ? (
          <Button
            onClick={closeMenu}
            variant="unstyled"
            size="unstyled"
            className={cn('px-4 h-10 rounded-lg hover:bg-foreground/10 transition duration-300 ease-in-out')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span className="text-lg ml-6">Close</span>
          </Button>
        ) : (
          <Button
            onClick={() => setMenuOpen(true)}
            variant="unstyled"
            size="unstyled"
            className={cn('w-10 h-10 rounded-lg hover:bg-foreground/20 transition duration-300 ease-in-out')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        )}

        <div className="flex flex-col gap-4 px-4 py-10">
          <Link href="/mealplan">
            <Button
              onClick={closeMenu}
              variant="unstyled"
              size="unstyled"
              className={cn(
                'h-16 p-4 rounded-xl hover:bg-primary/20 justify-start',
                menuOpen ? 'w-full' : 'w-16',
                pathName === '/mealplan' && 'bg-primary/30'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
              </svg>
              {menuOpen && <span className="text-lg ml-6">Mealplan</span>}
            </Button>
          </Link>
          {session ? (
            <Link href="/recipes">
              <Button
                onClick={closeMenu}
                variant="unstyled"
                size="unstyled"
                className={cn(
                  'h-16 p-4 rounded-xl hover:bg-primary/30 justify-start',
                  menuOpen ? 'w-full' : 'w-16',
                  pathName.includes('recipes') && 'bg-primary/30'
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                  <line x1="6" x2="18" y1="17" y2="17" />
                </svg>
                {menuOpen && <span className="text-lg ml-6">Recipes</span>}
              </Button>
            </Link>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className={cn(
                    'h-16 p-4 rounded-xl hover:bg-primary/10 text-inactive inline-flex items-center justify-start cursor-default',
                    menuOpen ? 'w-full' : 'w-16'
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                    <line x1="6" x2="18" y1="17" y2="17" />
                  </svg>
                  {menuOpen && <span className="text-lg ml-6">Recipes</span>}
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Sign in to manage your recipes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </aside>

      <header className={cn('sticky top-0 z-40 py-2 bg-background/90 backdrop-blur border-b flex justify-between items-center', headerClassName)}>
        {/* Mobile menu button */}
        <Button
          onClick={openMenuMobile}
          variant="unstyled"
          size="unstyled"
          className={cn('md:hidden w-10 h-10 rounded-lg hover:bg-foreground/20 transition duration-300 ease-in-out')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
        <h2>Yes, Chef!</h2>
        {session ? (
          <AccountDropdown session={session} />
        ) : (
          <Link href="/api/auth/signin">
            <Button size="sm">Login</Button>
          </Link>
        )}
      </header>

      {/* Backdrop */}
      {mobileMenuOpen && <div onClick={closeMenu} className="absolute w-screen h-screen z-40 backdrop-brightness-75 backdrop-blur-sm"></div>}
    </>
  );
}
