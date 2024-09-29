import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { People } from "../people";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Prop = {
  params: { query: string };
};
export default async function SearchQueryPage({ params }: Prop) {
  const session = (await getServerSession(authOptions)) as Session;

  const result = await db.$queryRaw<
    User[]
  >`SELECT * FROM User WHERE (display_name LIKE ${`%${params.query.toLowerCase()}%`} OR user_name LIKE ${`%${params.query.toLowerCase()}%`}) AND id != ${
    session.user.id
  }`;
  const following = await db.friendship.findMany({
    where: {
      user_requested_to_follow_id: session.user.id,
    },
  });

  const revalidate_path = `/home/search/${params.query}`;

  return (
    <div className="h-full overflow-auto">
      {result.map((user, i) => {
        return (
          <People
            key={i}
            user={user}
            session={session}
            sessionUserFollowings={following}
            revalidate_path={revalidate_path}
          />
        );
      })}
    </div>
  );
}
