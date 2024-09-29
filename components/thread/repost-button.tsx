import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Thread, User } from "@prisma/client";
import { removeRepostAction, repostAction } from "./actions/repostActions";
import { Button } from "../ui/button";

type Prop = {
  thread: Thread;
  revalidate_path: string;
  reposts: Thread[];
  sessionUser: User;
};

export function RepostButton({
  thread,
  revalidate_path,
  reposts,
  sessionUser,
}: Prop) {
  const isReposted =
    reposts.filter((e) => e.author_id === sessionUser.id).length > 0;

  if (isReposted)
    return (
      <DropdownMenu>
        <Button variant={"ghost"} asChild size={"icon"}>
          <DropdownMenuTrigger>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 12C19.5 10.768 19.454 9.547 19.362 8.338C19.2912 7.38015 18.8787 6.4796 18.1996 5.80045C17.5204 5.1213 16.6199 4.70876 15.662 4.638C13.2241 4.45408 10.7759 4.45408 8.338 4.638C7.38015 4.70876 6.4796 5.1213 5.80045 5.80045C5.1213 6.4796 4.70876 7.38015 4.638 8.338C4.621 8.558 4.606 8.779 4.592 9M19.5 12L22.5 9M19.5 12L16.5 9M4.5 12C4.5 13.232 4.546 14.453 4.638 15.662C4.70876 16.6199 5.1213 17.5204 5.80045 18.1996C6.4796 18.8787 7.38015 19.2912 8.338 19.362C10.7759 19.546 13.2241 19.546 15.662 19.362C16.6199 19.2912 17.5204 18.8787 18.1996 18.1996C18.8787 17.5204 19.2912 16.6199 19.362 15.662C19.379 15.442 19.394 15.221 19.408 15M4.5 12L7.5 15M4.5 12L1.5 15"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 12.25L11.5 14.25L14.5 9.75"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent>
          <form action={removeRepostAction}>
            <input
              name="thread_that_have_been_reposted_id"
              defaultValue={thread.id}
              className="hidden"
            />
            <input
              name="revalidate_path"
              className="hidden"
              defaultValue={revalidate_path}
            />
            <button type="submit" className="block p-0 w-full">
              <DropdownMenuItem className="text-red-500">
                Remove Repost
              </DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <Button variant={"ghost"} asChild size={"icon"}>
        <DropdownMenuTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <form action={repostAction}>
          <input
            name="thread_to_be_reposted_id"
            defaultValue={thread.id}
            className="hidden"
          />
          <input
            name="revalidate_path"
            className="hidden"
            defaultValue={revalidate_path}
          />
          <button type="submit" className="block p-0 w-full">
            <DropdownMenuItem>Repost</DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
