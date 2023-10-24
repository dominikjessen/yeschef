import Link from 'next/link';
import Image from 'next/image';
import HeroImage from '/public/HeroImage.svg';
import DummyMealplanCard from '@/components/ui/DummyMealplanCard';

// Starting at Sunday here for JS .getDay() indexing
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default async function Home() {
  return (
    <div className="my-6 md:my-8 lg:my-12 py-12 md:py-24 lg:py-32 xl:py-40 px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 place-items-center bg-white rounded-3xl">
      <div className="flex flex-col gap-4 lg:gap-8 order-last md:order-first">
        <h1 className="font-bold text-4xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">Weekly meal planning done in no time!</h1>
        <h2 className="text-lg md:text-sm lg:text-base xl:text-xl text-foreground/70">
          Use your own recipes or random inspiring recipes from different cuisines to plan your recipes for the whole week.
        </h2>
        <div className="flex flex-col xl:flex-row gap-4 lg:gap-8 mt-4">
          <Link
            href="/mealplan"
            role="button"
            className="rounded-lg h-14 px-12 py-6 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-foreground hover:bg-primary/70"
          >
            Start meal planning
          </Link>
          <Link
            href="/register"
            className="rounded-lg h-14 px-12 py-6 border border-border hover:bg-foreground hover:text-background inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Create free account
          </Link>
        </div>
      </div>
      <div>
        <span className="hidden md:block absolute md:top-[24%] lg:top-[29%] xl:top-[27%] left-[59%] md:w-32 lg:w-48 xl:w-64 font-bold text-xl lg:text-3xl text-center z-20">
          {weekdays[new Date().getDay()]}
        </span>
        <DummyMealplanCard className="hidden md:flex absolute md:top-[30%] lg:top-[35%] xl:top-[33%] left-[59%] md:w-32 lg:w-48 xl:w-64 md:h-64 lg:h-80 xl:h-96 shadow-lg z-20" />
        <Image
          src={HeroImage.src}
          alt="Yes, Chef!'s main meal planning view"
          width={HeroImage.width}
          height={HeroImage.height}
          className="border-4 xl:border-8 border-black rounded-xl lg:rounded-2xl xl:rounded-3xl z-10"
        />
      </div>
    </div>
  );
}
