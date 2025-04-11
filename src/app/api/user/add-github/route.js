export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, username } = body;
    if (!email || !username) {
      return NextResponse.json(
        { error: "email and username are required" },
        { status: 400 }
      );
    }
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const usernameAlreadyExists = await db.accounts.findUnique({
      where: { username },
    });
    if (usernameAlreadyExists)
      return NextResponse.json(
        { error: "github account already associated" },
        { status: 409 }
      );
    const newAccount = await db.accounts.create({
      data: {
        username: username,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        message: "Account added successfully",
        newAccount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// const res = await fetch(`https://api.github.com/users/${username}/repos`);
