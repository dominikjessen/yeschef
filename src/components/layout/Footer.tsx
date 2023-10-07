import Image from 'next/image';
import EdamamBadge from '/public/Edamam_Badge_Transparent.svg';

export default async function Footer() {
  return (
    <footer className="bg-green-200 px-10 py-12">
      <div>Footer</div>
      <Image src={EdamamBadge} alt="Powered by Edamam" width={200} />
    </footer>
  );
}
