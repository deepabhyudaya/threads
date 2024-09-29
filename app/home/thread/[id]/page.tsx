import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ThreadComponent } from "@/components/thread/thread";
import { db } from "@/lib/db";
import { Session, getServerSession } from "next-auth";
import { Header } from "./header";
import { ReplyTrigger } from "./reply-trigger";

type Prop = {
  params: { id: string };
};

export default async function ThreadPage({ params }: Prop) {
  const thread = await db.thread.findFirstOrThrow({
    where: {
      id: params.id,
    },
    include: {
      author: true,
      Like: true,
      reposts: true,
      replied_by: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          Like: true,
          reposts: true,
          replied_by: true,
        },
      },
      reply_to: {
        include: {
          author: true,
          Like: true,
          reposts: true,
          replied_by: true,
          reply_to: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  const session = (await getServerSession(authOptions)) as Session;
  const sessionUser = await db.user.findFirstOrThrow({
    where: {
      id: session.user.id,
    },
  });

  const revalidate_path = `/home/thread/${params.id}`;

  return (
    <div className="h-full grid grid-rows-[min-content_1fr] overflow-auto relative">
      <Header />
      {/* content */}
      <div className="container h-full pt-1 overflow-auto pb-20">
        {/* replying to */}
        {thread.reply_to ? (
          <ThreadComponent
            thread={thread.reply_to}
            author={thread.reply_to.author}
            likes={thread.reply_to.Like}
            sessionUser={sessionUser}
            isToBeReplied={true}
            replying_to_author={thread.reply_to?.reply_to?.author}
            revalidate_path={revalidate_path}
            reposts={thread.reply_to.reposts}
            replied_by={thread.reply_to.replied_by}
            hyperlink={true}
          />
        ) : (
          <></>
        )}
        {/* main subject */}
        <ThreadComponent
          thread={thread}
          author={thread.author}
          likes={thread.Like}
          sessionUser={sessionUser}
          revalidate_path={revalidate_path}
          reposts={thread.reposts}
          replied_by={thread.replied_by}
          isReply={!!thread.reply_to}
        />
        {/* replies */}
        <h3 className="py-4 text-lg font-semibold">
          Replies ({thread.replied_by.length})
        </h3>
        {thread.replied_by.map((replies, i) => (
          <ThreadComponent
            key={i}
            thread={replies}
            author={replies.author}
            likes={replies.Like}
            sessionUser={sessionUser}
            revalidate_path={revalidate_path}
            reposts={replies.reposts}
            replied_by={replies.replied_by}
            isReply={true}
            hyperlink={true}
          />
        ))}
      </div>
      {/* reply trigger */}
      <ReplyTrigger
        sessionUser={sessionUser}
        author={thread.author}
        thread={thread}
      />
    </div>
  );
}
