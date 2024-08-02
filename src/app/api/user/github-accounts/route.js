import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import axios from "axios";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
      include: { githubAccounts: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const githubAccountsWithRepos = await Promise.all(
      user.githubAccounts.map(async (account) => {
        try {
          const githubRepoRes = await axios.get(
            `https://api.github.com/users/${account.username}/repos`
          );
          return {
            username: account.username,
            repos: githubRepoRes.data.map((repo) => ({
              name: repo.name,
              createdAt: repo.created_at,
              updatedAt: repo.updated_at,
            })),
          };
        } catch (err) {
          console.error(
            `Failed to fetch repos for username ${account.username}:`,
            err
          );
          return {
            username: account.username,
            repos: [],
          };
        }
      })
    );
    return NextResponse.json(
      { githubAccounts: githubAccountsWithRepos },
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
