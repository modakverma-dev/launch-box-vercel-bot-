import React from "react";
import ImportRepo from "./ImportRepo";

const DashboardScreen = async ({ session }) => {
  return (
    <main className=" px-5 py-20 ">
      <span className="bg-neutral-200/60 rounded-3xl py-1 text-center text-xs font-light px-2">
        {session?.user?.username}'s projects
      </span>
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1200px] w-full my-10">
          <h1 className="text-5xl font-semibold text-start">
            Let's build something new.
          </h1>
          <p className="text-neutral-600 font-light mt-4">
            To deploy a new Project, import an existing Git Repository or get
            started with one of our Templates.
          </p>
          <div className="mt-20 ">
            <ImportRepo session={session} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardScreen;
