import { ReactNode } from "react";
import { NavBar } from "./nav-bar";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as Session;
  const dbUser = await db.user.findFirstOrThrow({
    where: {
      id: session?.user.id,
    },
    include: {
      follower: true,
    },
  });

  if (!dbUser.isProfileCustomized) redirect("/customize-profile");

  const unreadActivity =
    dbUser.follower.filter((e) => e.activity_read === false).length > 0;

  return (
    <div className="h-full grid grid-rows-[1fr_min-content] overflow-auto">
      {children}
      <NavBar unreadActivity={unreadActivity} user={dbUser} />
    </div>
  );
}
