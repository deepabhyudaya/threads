import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { Session, getServerSession } from 'next-auth';
import { People } from './people';

export default async function ActivityPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const dbUser = await db.user.findFirstOrThrow({
    where: {
      id: session.user.id,
    },
    include: {
      follower: {
        include: {
          user_requested_to_follow: true,
        },
      },
      following: true,
    },
  });

  // set activity status to have read
  await db.friendship.updateMany({
    where: {
      user_to_be_followed_id: dbUser.id,
    },
    data: {
      activity_read: true,
    },
  });

  return (
    <div className="container h-full grid grid-rows-[min-content_1fr] gap-4 pt-6 overflow-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Activity</h1>
      </div>
      <div className="h-full overflow-auto">
        {dbUser.follower.length > 0 ? (
          dbUser.follower.map((friendship, i) => {
            return (
              <People
                user={friendship.user_requested_to_follow}
                friendship={friendship}
                sessionUserFollowings={dbUser.following}
                revalidate_path={`/home/activity`}
                key={i}
              />
            );
          })
        ) : (
          <p className="italic tracking-wide">Mera life jyada blank hai isse</p>
        )}
      </div>
    </div>
  );
}
