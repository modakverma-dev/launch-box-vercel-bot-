import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import FeaturedSection from "@/components/dashboard/FeaturedScreen";
import DashboardScreen from "@/components/dashboard/DashboardScreen";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <FeaturedSection />;
  }
  return <DashboardScreen session={session} />;
}
