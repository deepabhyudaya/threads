import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import Link from 'next/link';
import { ShareDialog } from '@/components/share-dialog';
import { followAction, unfollowAction } from '@/lib/followActions';

type Prop = {
  user: User;
  sessionUser: User;
  isFollowing: boolean;
};

export function ButtonGroup({ user, sessionUser, isFollowing }: Prop) {
  if (user.id === sessionUser.id) return <MyButtonGroup user={user} />;
  return <OthersButtonGroup user={user} isFollowing={isFollowing} />;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

function MyButtonGroup({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant={'secondary'} asChild>
        <Link href="/customize-profile">Edit Profile</Link>
      </Button>
      <ShareDialog
        trigger={
          <Button variant={'secondary'} className="w-full" asChild>
            <div>Share Profile</div>
          </Button>
        }
        url={`${SITE_URL}/home/profile/${user.id}`}
      />
    </div>
  );
}

async function OthersButtonGroup({
  user,
  isFollowing,
}: {
  user: User;
  isFollowing: boolean;
}) {
  if (!isFollowing)
    return (
      <form className="w-full grid" action={followAction}>
        <input
          name="user_to_be_followed_id"
          defaultValue={user.id}
          className="hidden"
        />
        <input
          name="revalidate_path"
          defaultValue={`/home/profile/${user.id}`}
          className="hidden"
        />
        <Button type="submit">Follow</Button>
      </form>
    );
  return (
    <form className="w-full grid" action={unfollowAction}>
      <input
        name="user_to_be_unfollowed_id"
        defaultValue={user.id}
        className="hidden"
      />
      <input
        name="revalidate_path"
        defaultValue={`/home/profile/${user.id}`}
        className="hidden"
      />
      <Button type="submit" variant={'outline'}>
        Following
      </Button>
    </form>
  );
}
