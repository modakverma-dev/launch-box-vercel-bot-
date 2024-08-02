"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { signIn } from "next-auth/react";
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = async ({ email, password }) => {
    if (loading) return;
    try {
      setLoading(true);
      const signInData = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (signInData?.error) {
        console.log(error);
      } else {
        router.push("/");
        router.refresh();
      }
      setLoading(false);
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
          {loading ? <Loader className="animate-spin" size="small" /> : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
