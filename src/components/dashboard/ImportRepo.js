"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Github, Loader2, PlusIcon, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ImportRepo = ({ session }) => {
  const [accountRepos, setAccountRepos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [githubUsername, setGithubUserName] = useState("");
  const [showAddField, setShowAddField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingFetch(true);
        const response = await fetch(
          `/api/user/github-accounts?email=${session?.user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAccountRepos(data?.githubAccounts);
        setLoadingFetch(false);
      } catch (err) {
        setLoadingFetch(false);
        console.log(err);
      }
    };
    if (session?.user?.email) {
      fetchData();
    }
  }, [session, activeIndex]);
  const handleAddGithubAccount = async () => {
    if (!showAddField) {
      setShowAddField(true);
      return;
    }
    try {
      if (!githubUsername?.length) return;
      setLoading(true);
      const response = await fetch("/api/user/add-github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          username: githubUsername,
        }),
      });
      setLoading(false);
      if (response.ok) {
        console.log(response, "response");
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white border rounded-md min-h-40 p-8 shadow-[0_25px_50px_15px_rgba(0,0,0,0.1)] flex flex-col gap-4 max-w-[700px] ">
      <h1 className="text-2xl font-semibold ">Import Git Repository</h1>
      <div className="flex gap-2 w-full">
        <Select className="flex-1 w-full">
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={accountRepos[activeIndex]?.username || "username"}
            />
          </SelectTrigger>
          <SelectContent className="rounded-xl p-1 flex flex-col gap-2">
            {accountRepos?.map((githubUser, index) => (
              <div
                value="light"
                className="relative hover:bg-neutral-100/90 transition p-2 cursor-pointer rounded-lg w-full text-sm font-base"
              >
                <div
                  onClick={() => {
                    setActiveIndex(index);
                  }}
                  className="flex gap-1 items-center justify-between w-full"
                >
                  <span className="flex gap-2">
                    <Github className="scale-[0.9] p-1 text-white bg-black rounded-full" />{" "}
                    {githubUser?.username}
                  </span>
                  {activeIndex === index && <Check className="scale-[0.7]" />}
                </div>
              </div>
            ))}
            <div
              className="hover:bg-neutral-100/90 transition p-2 cursor-pointer rounded-lg w-full text-sm font-base"
              value="system"
            >
              <span className="flex gap-1 items-center">
                <PlusIcon className="scale-[0.6]" /> Add Github Account
              </span>
            </div>
          </SelectContent>
        </Select>
        <div className="relative w-full">
          <Input className="pl-10 text-sm font-light" placeholder="Search.." />
          <Search className="absolute text-neutral-500 scale-[0.6] left-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      {loadingFetch ? (
        <div className="h-64 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="relative border w-full overflow-auto rounded-md flex flex-col justify-start h-72">
          {accountRepos[activeIndex]?.repos?.length ? (
            accountRepos[activeIndex]?.repos?.map((repo) => (
              <div className="p-3 w-full border-b flex justify-between text-center items-center hover:bg-neutral-100/30 transition">
                <span className="flex items-center gap-2 truncate">
                  <Github /> {repo?.name}
                  {activeIndex}
                </span>
                <Button className="h-9 text-sm">Import</Button>
              </div>
            ))
          ) : !accountRepos.length ? (
            <div className="w-full items-center gap-3 flex flex-col justify-center absolute top-1/2 -translate-y-1/2">
              <Button
                onClick={handleAddGithubAccount}
                variant={showAddField ? "outline" : "ghost"}
                className={cn(
                  "text-sm flex items-center gap-2",
                  showAddField && githubUsername
                    ? "bg-green-500 text-white hover:bg-green-600 hover:text-white border-green-600/60"
                    : "bg-neutral-100"
                )}
              >
                {showAddField ? <Check /> : <PlusIcon />}
                {loading ? "Loading.." : "Add Account"}
              </Button>
              {showAddField && (
                <div className="relative">
                  <Github className="absolute left-2 top-1/2 -translate-y-1/2" />
                  <Input
                    onChange={(e) => setGithubUserName(e.target.value)}
                    placeholder="Enter username"
                    className="pl-10"
                  />
                  <Trash2
                    onClick={() => {
                      setShowAddField(false);
                      setGithubUserName("");
                    }}
                    className="absolute hover:bg-red-200/50 transition h-8 w-8 p-1 rounded-md cursor-pointer -right-10 top-1/2 -translate-y-1/2"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full h-full bg-neutral-50/50">
              <p className="text-sm">No projects repos!</p>
              <Image
                className="w-8 h-8 ml-2"
                src="/empty-box.png"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
      )}
      <p className="text-sm pt-3 font-medium text-neutral-600">
        Import Third-Party Git Repository →
      </p>
    </div>
  );
};

export default ImportRepo;
