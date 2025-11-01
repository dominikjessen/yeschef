import Logo from "../../../../../public/YesChef_Logo.svg";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <Image
        src={Logo.src}
        width={Logo.width}
        height={Logo.height}
        alt="Yes, Chef! Logo"
      />
      <div className="animate-spin border-2 rounded-full w-8 h-8"></div>
    </div>
  );
}
