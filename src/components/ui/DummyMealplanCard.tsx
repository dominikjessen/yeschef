'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HTMLAttributes, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import mockRecipes from '@/lib/mockRecipes.json';

export default function DummyMealplanCard({ className }: HTMLAttributes<HTMLDivElement>) {
  const [locked, setLocked] = useState(false);
  const [randomizeOnCooldown, setRandomizeOnCooldown] = useState(false);
  const [current, setCurrent] = useState(0);
  const recipe = mockRecipes[current];

  async function handleNewRecipeClicked() {
    const randomExcluded = (min: number, max: number, excluded: number) => {
      let n = Math.floor(Math.random() * (max - min) + min);
      if (n >= excluded) {
        n++;
      }
      return n;
    };

    setRandomizeOnCooldown(true);
    setCurrent(randomExcluded(0, mockRecipes.length - 1, current));
  }

  return (
    <div
      className={cn(
        'flex-col gap-8 py-10 px-4 rounded-md border shadow-sm bg-card text-card-foreground flex items-center cursor-default grow h-full w-full',
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="icon"
              size="icon"
              onClick={handleNewRecipeClicked}
              onAnimationEnd={() => setRandomizeOnCooldown(false)}
              disabled={locked || randomizeOnCooldown}
              aria-label="Get new random recipe"
              className={randomizeOnCooldown ? 'animate-rollDice' : ''}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect className="h-5 w-5" x={2} y={2} rx="2" ry="2" />
                <path d="M16 8h.01" />
                <path d="M8 8h.01" />
                <path d="M8 16h.01" />
                <path d="M16 16h.01" />
                <path d="M12 12h.01" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Randomize recipe</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="icon" size="icon" onClick={() => setLocked((prev) => !prev)} aria-label={locked ? `Unlock recipe` : `Lock recipe`}>
              {locked ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{locked ? 'Unlock recipe' : 'Lock recipe'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-2 lg:gap-4">
        {recipe.url && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={recipe.url}
                  target="_blank"
                  aria-label="Go to recipe url"
                  className="h-6 w-6 md:h-9 md:w-9 lg:h-10 lg:w-10 hover:bg-foreground/10 flex items-center justify-center rounded"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to recipe</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <h3 className="font-semibold text-center pt-3 mt-auto line-clamp-3 text-sm xl:text-lg" title={recipe.name}>
        {recipe.name}
      </h3>
    </div>
  );
}
