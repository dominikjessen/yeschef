import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Logo from "../../../../public/YesChef_Logo.svg";
import Image from "next/image";

export default async function MagicLink() {
  const session = await getServerSession(authOptions);

  // Already logged in
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full flex flex-col px-12 pt-8 pb-12 border rounded-xl shadow-lg bg-white">
        <Image
          src={Logo.src}
          alt="Yes, Chef! Logo"
          width={Logo.width}
          height={Logo.height}
          className="self-center"
        />
        <h2 className="font-bold text-2xl mt-16 mb-8">Email sent!</h2>
        <h3 className="text-lg">
          A sign in link has been sent to your email address. You can close this
          page now.
        </h3>
      </div>
    </div>
  );
}
