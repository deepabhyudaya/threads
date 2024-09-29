import { db } from "@/lib/db";
import { Profile } from "./profile";
import { NavBar } from "./nav-bar";
import { ButtonGroup } from "./button-group";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Content } from "./content";

type Prop = {
  params: { id: string };
  searchParams: { tab: string };
};

export default async function ProfilePage({ params, searchParams }: Prop) {
  // session
  const session = (await getServerSession(authOptions)) as Session;
  const sessionUser = await db.user.findFirstOrThrow({
    where: {
      id: session.user.id,
    },
  });

  // data of the user the page refers to
  const dbUser = await db.user.findFirstOrThrow({
    where: {
      id: params.id,
    },
    include: {
      follower: true,
    },
  });

  const defaultTab = searchParams.tab || "threads";

  const isFollowing =
    dbUser.follower.filter(
      (e) => e.user_requested_to_follow_id === sessionUser.id
    ).length > 0;

  return (
    <div className="container h-full flex flex-col gap-4 pt-4 overflow-auto">
      {/* nav bar */}
      <NavBar user={dbUser} session={session} />
      {/* profile */}
      <Profile user={dbUser} followers={dbUser.follower} />
      {/* button group */}
      <ButtonGroup
        user={dbUser}
        sessionUser={sessionUser}
        isFollowing={isFollowing}
      />
      {/* content */}
      <Content
        user={dbUser}
        sessionUser={sessionUser}
        defaultTab={defaultTab}
      />
    </div>
  );
}
