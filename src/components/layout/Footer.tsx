import Image from 'next/image';
import EdamamBadge from '/public/Edamam_Badge_Transparent.svg';
import Logo from '/public/YesChef_Logo.svg';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export default async function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn('bg-white py-6 flex flex-col items-center gap-8', className)}>
      <div className="flex gap-8 items-center py-2">
        <Image src={EdamamBadge} alt="Powered by Edamam" width={150} priority={false} className="mr-16" />

        {/* <Image src={Logo.src} alt="Yes, Chef! Logo" width={Logo.width} height={Logo.height} className="mr-32" /> */}
        <Link href="/terms" className="hover:text-primary">
          Terms of Service
        </Link>
        <Link href="/privacy-policy" className="hover:text-primary">
          Privacy Policy
        </Link>
      </div>
      <Separator className="w-1/5" />
      <span className="text-sm text-foreground/70">© Yes, Chef! 2023. All rights reserved.</span>
    </footer>
  );
}
