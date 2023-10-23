import Link from 'next/link';
import Image from 'next/image';
import HeroImage from '/public/HeroImage.svg';
import DummyMealplanCard from '@/components/ui/DummyMealplanCard';

// Starting at Sunday here for JS .getDay() indexing
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default async function Home() {
  return (
    <div className="my-12 py-40 px-12 grid grid-cols-1 md:grid-cols-2 gap-20 place-items-center bg-white rounded-3xl">
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-5xl leading-tight">Weekly meal planning done in no time!</h1>
        <h2 className="text-xl text-foreground/70">
          Use your own recipes or random inspiring recipes from different cuisines to plan your recipes for the whole week.
        </h2>
        <div className="flex gap-12 mt-4">
          <Link
            href="/mealplan"
            role="button"
            className="rounded-lg h-14 px-12 py-6 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-foreground hover:bg-primary/70"
          >
            Start meal planning
          </Link>
          <Link
            href="/register"
            className="rounded-lg h-14 px-12 py-6 border border-border hover:bg-primary hover:text-foreground inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Create free account
          </Link>
        </div>
      </div>
      <div>
        <span className="hidden md:block absolute top-[27%] left-[59%] w-64 font-bold text-3xl text-center z-20">
          {weekdays[new Date().getDay()]}
        </span>
        <DummyMealplanCard className="hidden md:flex absolute top-[33%] left-[59%] w-64 h-96 shadow-lg z-20" />
        <Image
          src={HeroImage.src}
          alt="Yes, Chef!'s main meal planning view"
          width={HeroImage.width}
          height={HeroImage.height}
          className="border-8 border-black rounded-3xl z-10"
        />
      </div>
    </div>
  );
}
