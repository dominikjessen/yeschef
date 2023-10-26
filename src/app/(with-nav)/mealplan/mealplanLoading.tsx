import Logo from '/public/YesChef_Logo.svg';
import Image from 'next/image';

export default function MealplanLoading() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-full max-w-full w-full h-full flex flex-col items-center justify-center gap-12">
      <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="Yes, Chef! Logo" />
      <div className="animate-spin flex items-center justify-center rounded-full w-24 h-24 bg-gradient-to-t from-primary to-secondary">
        <div className="h-16 w-16 rounded-full bg-background"></div>
      </div>
    </div>
  );
}
