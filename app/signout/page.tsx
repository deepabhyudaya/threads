import { getServerSession } from 'next-auth';
import { SignOutButton } from './sign-out-button';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { db } from '@/lib/db';
import { UserAvatar } from '@/components/user-avatar';
import { BackButton } from '@/components/back-button';
import Image from 'next/image';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default async function SignOutPage() {
  const session = await getServerSession(authOptions);

  // check if signin
  if (!session) redirect(`/signin?callbackUrl=${SITE_URL}/home`);

  // get avatar
  const dbUser = await db.user.findFirstOrThrow({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className="container h-full grid grid-rows-[1fr_min-content] py-8 ">
      <div className="flex flex-col justify-center items-center relative">
        <BackButton className="absolute top-0 left-0" />
        {/* avatar */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <UserAvatar
                className="absolute right-0 top-0"
                avatar_type={dbUser.avatar_type}
                avatar_value={dbUser.avatar_value}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{session.user.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* content */}
        <Image src={'/logo.png'} width={135} height={135} alt="" />
        <p className="mt-4 text-2xl font-semibold">
          sacch mein <span className="text-red-500">Sign Out</span>?
        </p>
      </div>
      <SignOutButton />
    </div>
  );
}
