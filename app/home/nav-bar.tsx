'use client';

import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Prop = {
  user: User;
  unreadActivity: boolean;
};

export function NavBar({ unreadActivity, user }: Prop) {
  const pathname = usePathname();

  const pagePath = {
    home: '/home',
    search: '/home/search',
    new: '/home/new',
    activity: '/home/activity',
    profile: `/home/profile/${user.id}`,
  };

  return (
    <div className="flex justify-around py-3">
      {/* home */}
      <Button variant="link" asChild size={'icon'}>
        <Link href={pagePath.home}>
          {pathname === pagePath.home ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          )}
        </Link>
      </Button>
      {/* search */}
      <Button variant="link" asChild size={'icon'}>
        <Link href={pagePath.search}>
          {pathname.includes(pagePath.search) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8.01256 4.49478C8.80117 4.16813 9.64641 4 10.5 4C12.2239 4 13.8772 4.68482 15.0962 5.90381C16.3152 7.12279 17 8.77609 17 10.5C17 12.2239 16.3152 13.8772 15.0962 15.0962C13.8772 16.3152 12.2239 17 10.5 17C9.64641 17 8.80117 16.8319 8.01256 16.5052C7.22394 16.1786 6.50739 15.6998 5.90381 15.0962C5.30023 14.4926 4.82144 13.7761 4.49478 12.9874C4.16813 12.1988 4 11.3536 4 10.5C4 9.64641 4.16813 8.80117 4.49478 8.01256C4.82144 7.22394 5.30023 6.50739 5.90381 5.90381C6.50739 5.30022 7.22394 4.82144 8.01256 4.49478ZM2.959 6.57894C2.32912 7.78998 2.00018 9.13491 2 10.5C1.99982 12.1154 2.46001 13.6975 3.32665 15.0608C4.19329 16.4242 5.4305 17.5123 6.89333 18.1978C8.35617 18.8833 9.98405 19.1377 11.5863 18.9312C13.1129 18.7345 14.5559 18.1272 15.7624 17.176L20.2903 21.7039C20.3812 21.8005 20.4905 21.8781 20.6117 21.9321C20.7344 21.9868 20.8668 22.0162 21.0011 22.0186C21.1353 22.0209 21.2687 21.9962 21.3932 21.9459C21.5177 21.8956 21.6309 21.8208 21.7258 21.7258C21.8208 21.6309 21.8956 21.5177 21.9459 21.3932C21.9962 21.2687 22.0209 21.1353 22.0186 21.0011C22.0162 20.8668 21.9868 20.7344 21.9321 20.6117C21.8781 20.4905 21.8005 20.3812 21.7039 20.2903L17.176 15.7624C17.9725 14.7517 18.5298 13.5725 18.8046 12.3133C19.0956 10.9797 19.0612 9.59551 18.7041 8.27797C18.3471 6.96044 17.678 5.74826 16.7535 4.74399C15.8289 3.73972 14.6761 2.97289 13.3925 2.50838C12.1089 2.04386 10.7323 1.89531 9.3792 2.07531C8.02606 2.2553 6.73619 2.75854 5.61867 3.54245C4.50115 4.32637 3.58887 5.3679 2.959 6.57894Z"
                fill="white"
                stroke="white"
                strokeWidth="0.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          )}
        </Link>
      </Button>
      {/* new */}
      <Button variant="link" asChild size={'icon'}>
        <Link href={pagePath.new}>
          {pathname === pagePath.new ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          )}
        </Link>
      </Button>
      {/* acticity */}
      <Button variant="link" asChild size={'icon'}>
        <Link href={pagePath.activity} className="relative">
          {pathname === pagePath.activity ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
          {/* unread status */}
          {unreadActivity ? (
            <div className="rounded-full aspect-square w-[6px] bg-red-500 absolute top-[5px] right-[5px]" />
          ) : (
            <></>
          )}
        </Link>
      </Button>
      {/* profile */}
      <Button variant="link" asChild size={'icon'}>
        <Link href={pagePath.profile}>
          {pathname === pagePath.profile ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}
        </Link>
      </Button>
    </div>
  );
}
