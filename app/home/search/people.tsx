import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Friendship, User } from "@prisma/client";
import Link from "next/link";
import { followAction, unfollowAction } from "@/lib/followActions";
import { UserAvatar } from "@/components/user-avatar";
import { Session } from "next-auth";

type Prop = {
  user: User;
  sessionUserFollowings: Friendship[];
  revalidate_path: string;
  session: Session;
};

export function People({
  user,
  sessionUserFollowings,
  revalidate_path,
  session,
}: Prop) {
  const isFollowed =
    sessionUserFollowings.filter((e) => e.user_to_be_followed_id === user.id)
      .length > 0;

  return (
    <div className="grid grid-cols-[min-content_1fr] gap-3 mt-4">
      {/* avatar */}
      <UserAvatar
        avatar_type={user.avatar_type}
        avatar_value={user.avatar_value}
      />
      <div>
        {/* names and follow button */}
        <div className="grid grid-cols-[1fr_min-content]">
          <Link href={`/home/profile/${user.id}`}>
            <div>
              <p className="font-medium leading-none">{user.user_name}</p>
              <p className="leading-loose text-slate-500">
                {user.display_name}
              </p>
            </div>
          </Link>
          {session.user.id !== user.id ? (
            !isFollowed ? (
              <form action={followAction}>
                <input
                  name="user_to_be_followed_id"
                  defaultValue={user.id}
                  className="hidden"
                />
                <input
                  name="revalidate_path"
                  defaultValue={revalidate_path}
                  className="hidden"
                />
                <Button variant={"outline"} className="w-24" type="submit">
                  Follow
                </Button>
              </form>
            ) : (
              <form action={unfollowAction}>
                <input
                  name="user_to_be_unfollowed_id"
                  defaultValue={user.id}
                  className="hidden"
                />
                <input
                  name="revalidate_path"
                  defaultValue={revalidate_path}
                  className="hidden"
                />
                <Button variant={"outline"} className="w-24" type="submit">
                  Following
                </Button>
              </form>
            )
          ) : (
            <></>
          )}
        </div>
        <Separator className="mt-2" />
      </div>
    </div>
  );
}
