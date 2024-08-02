import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import UserAccountnav from "./UserAccountnav";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 w-full flex justify-between px-6 py-2 items-center border-b bg-white">
      <Link
        href="/"
        className="font-extrabold text-3xl flex items-center gap-2"
      >
        <Image
          className="w-8 h-8"
          src="/box.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        LaunchBox
      </Link>
      {session?.user ? (
        <UserAccountnav session={session} />
      ) : (
        <div className="flex gap-3">
          <Link href="/auth">
            <Button>SignUp</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="secondary"> SignIn</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
