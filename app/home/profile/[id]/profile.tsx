import { Friendship, User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getAvatarUrl } from "@/lib/utils";

const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN;

type Prop = {
  user: User;
  followers: Friendship[];
};

export async function Profile({ user, followers }: Prop) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        {/* names */}
        <div>
          {/* display name */}
          <h3 className="text-xl leading-snug font-bold">
            {user.display_name}
          </h3>
          {/* user name */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <p>{user.user_name}</p>
            <Badge variant={"secondary"} className="text-xs font-normal">
              {SITE_DOMAIN}
            </Badge>
          </div>
        </div>
        {/* avatar */}
        <Image
          src={getAvatarUrl({
            avatar_type: user.avatar_type,
            avatar_value: user.avatar_value,
            width: 60,
            height: 60,
          })}
          alt=""
          width={"60"}
          height={"60"}
          className="rounded-full object-center object-cover"
        />
      </div>
      {/* bio */}
      <p className="leading-snug whitespace-pre-line">{user.bio}</p>
      {/* followers number */}
      {followers.length > 0 ? (
        <p className="text-slate-500 leading-none indent-1">
          {followers.length > 1
            ? `${followers.length} followers`
            : "1 follower"}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}
