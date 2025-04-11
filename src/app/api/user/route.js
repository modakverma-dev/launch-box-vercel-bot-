export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";
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
    .max(50, "Password cannot exceed 50 characters"),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    const emailAlreadyExists = await db.user.findUnique({
      where: { email: email },
    });
    const usernameAlreadyExists = await db.user.findUnique({
      where: { username: username },
    });
    if (emailAlreadyExists) {
      return NextResponse.json(
        {
          user: null,
          message: "User with email already exists",
        },
        { status: 409 }
      );
    }
    if (usernameAlreadyExists) {
      return NextResponse.json(
        {
          user: null,
          message: "Username already taken!",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error, "auth error");
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      {
        status: 500,
      }
    );
  }
}
