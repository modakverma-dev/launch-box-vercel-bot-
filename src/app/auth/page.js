"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
const Auth = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async ({ username, email, password }) => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      setLoading(false);
      if (response.ok) {
        router.push("/sign-in");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FFFFF] shadow h-auto border w-[500px] p-5 rounded-lg flex gap-4 flex-col"
      >
        <div>
          <label className="text-sm" htmlFor="username">
            Username
          </label>
          <Input
            type="text"
            {...register("username")}
            name="username"
            placeholder="Enter here"
            id="username"
            className="bg-white"
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            {...register("email")}
            name="email"
            placeholder="Enter here"
            id="email"
            className="bg-white"
          />
        </div>
        <div>
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <Input
            {...register("password")}
            name="password"
            type="password"
            placeholder="Enter here"
            id="password"
            className="bg-white"
          />
        </div>
        <Button type="submit">
          {loading ? (
            <Loader className="animate-spin" size="small" />
          ) : (
            "SignUp"
          )}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
