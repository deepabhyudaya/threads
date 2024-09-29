import { Header } from "./header";
import { db } from "@/lib/db";
import { ThreadComponent } from "@/components/thread/thread";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const revalidate_path = "/home";

export default async function HomePage() {
  const session = (await getServerSession(authOptions)) as Session;
  const sessionUser = await db.user.findFirstOrThrow({
    where: {
      id: session.user.id,
    },
  });

  // root threads
  const threads = await db.thread.findMany({
    where: {
      reply_to_id: null,
      repost_from_id: null,
    },
    include: {
      author: true,
      reposts: true,
      replied_by: true,
      Like: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="h-full grid grid-rows-[min-content_1fr] overflow-auto">
      <Header />
      <div className="h-full pt-1 container overflow-auto">
        {threads.map((thread, i) => (
          <ThreadComponent
            key={i}
            thread={thread}
            author={thread.author}
            likes={thread.Like}
            sessionUser={sessionUser}
            revalidate_path={revalidate_path}
            reposts={thread.reposts}
            replied_by={thread.replied_by}
            hyperlink={true}
          />
        ))}
      </div>
    </div>
  );
}
