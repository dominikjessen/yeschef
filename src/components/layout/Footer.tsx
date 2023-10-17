import Image from 'next/image';
import EdamamBadge from '/public/Edamam_Badge_Transparent.svg';
import { cn } from '@/lib/utils';

export default async function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('bg-white py-12', className)}>
      <div>Footer</div>
      <Image src={EdamamBadge} alt="Powered by Edamam" width={200} priority={false} />
    </footer>
  );
}
