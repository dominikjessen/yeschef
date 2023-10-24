import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingRecipes() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Your Recipes</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 md:gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-20" />
        ))}
      </div>
    </div>
  );
}
