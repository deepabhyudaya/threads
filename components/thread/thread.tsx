import { Like, Thread, User } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { ReplyDialog } from "@/components/reply-dialog";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import { LikeButton } from "./like-button";
import { RepostButton } from "./repost-button";
import { ShareDialog } from "../share-dialog";
import Link from "next/link";
import { UserAvatar } from "../user-avatar";
import Image from "next/image";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// isReply: a thread that replied to another thread
// isToBeReplied: the thread that was replied by the thread to be displayed
// isRepost: the thread that was reposted by the user to be displayed

// reposts: repost-type threads of the thread to be displayed
// replied_by: reply-type threads of the thread to be displayed
// replying_to_author: the author of the thread that the thread to be displayed is replying to

type Prop = {
  sessionUser: User;
  revalidate_path: string;
  thread: Thread;
  author: User;
  likes: Like[];
  reposts: Thread[];
  replied_by: Thread[];
  replying_to_author?: User;
  isReply?: boolean;
  isToBeReplied?: boolean;
  isRepost?: boolean;
  hyperlink?: boolean;
};

export function ThreadComponent({
  sessionUser,
  revalidate_path,
  thread,
  author,
  likes,
  reposts,
  replied_by,
  replying_to_author,
  isReply,
  isToBeReplied,
  isRepost,
  hyperlink,
}: Prop) {
  return (
    <div>
      <div
        className={cn(
          "grid grid-cols-[min-content_1fr] gap-3 py-4",
          isToBeReplied ? "pt-4 pb-0" : "",
          isRepost ? "pt-2 pb-4" : "",
          isReply ? "py-3" : ""
        )}
      >
        {/* avatar & a string dropping down */}
        <div className="grid grid-rows-[min-content_1fr] gap-2">
          <UserAvatar
            avatar_type={author.avatar_type}
            avatar_value={author.avatar_value}
          />
          {isReply ? (
            <></>
          ) : (
            <div className="h-full w-[2px] bg-slate-100 mx-auto" />
          )}
        </div>

        {/* names & conent & attachment & buttons group & replies & likes */}
        <div className="w-full grid gap-1">
          {/* name */}
          <Header
            author={author}
            thread={thread}
            sessionUser={sessionUser}
            replying_to_author={replying_to_author}
            revalidate_path={revalidate_path}
            hyperlink={hyperlink}
          />

          {/* content */}
          {hyperlink ? (
            <Link href={`/home/thread/${thread.id}`}>
              <p className="leading-snug whitespace-pre-line">
                {thread.content}
              </p>
            </Link>
          ) : (
            <p className="leading-snug whitespace-pre-line">{thread.content}</p>
          )}

          {/* attachment */}
          {thread.attachment ? (
            <Image
              src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_332/${thread.attachment}`}
              alt=""
              className="w-full max-h-[360px] rounded-md object-cover object-center"
              width={332}
              height={360}
            />
          ) : (
            <></>
          )}

          {/* button group */}
          <div className="flex">
            <LikeButton
              thread={thread}
              sessionUser={sessionUser}
              likes={likes}
              revalidate_path={revalidate_path}
            />
            <ReplyDialog
              thread={thread}
              author={author}
              sessionUser={sessionUser}
              trigger={
                <Button variant={"ghost"} asChild size={"icon"}>
                  <p>
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
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                      />
                    </svg>
                  </p>
                </Button>
              }
            />
            <RepostButton
              revalidate_path={revalidate_path}
              thread={thread}
              reposts={reposts}
              sessionUser={sessionUser}
            />
            <ShareDialog
              trigger={
                <Button variant={"ghost"} size={"icon"} asChild>
                  <div>
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
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </div>
                </Button>
              }
              url={`${SITE_URL}/home/thread/${thread.id}`}
            />
          </div>

          {/* replies number & likes number */}
          {replied_by.length > 0 || likes.length > 0 ? (
            <p className="text-slate-500 text-sm">
              {replied_by.length > 0 ? `${replied_by.length} replies` : ""}
              {replied_by.length > 0 && likes.length > 0 ? " • " : ""}
              {likes.length > 0 ? `${likes.length} likes` : ""}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      {isToBeReplied ? <></> : <Separator />}
    </div>
  );
}
