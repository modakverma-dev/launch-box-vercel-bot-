import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const FeaturedScreen = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-20">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] text-7xl font-extrabold gap-4">
        Launch
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-24 h-24"
          src="/box.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="w-full  flex items-center justify-center flex-col gap-8">
        <p className="text-xl text-center w-2/3 text-neutral-600">
          LaunchBox's Frontend Cloud provides the developer experience and
          infrastructure to{" "}
          <span className="font-semibold text-black">build</span>,{" "}
          <span className="font-semibold text-black">scale</span>, and{" "}
          <span className="font-semibold text-black">secure</span> a faster,
          more personalized web.
        </p>
        <div className="flex items-center gap-3">
          <Button className="text-md font-medium h-12 gap-1">
            Start your first tutorial{" "}
            <ArrowRightIcon className="scale-[0.65]" />
          </Button>
          <span className="text-sm font-light text-neutral-600">or</span>
          <Button variant="outline" className="h-12 text-md font-medium">
            <Link href="/sign-in">Deploy your first project</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default FeaturedScreen;
