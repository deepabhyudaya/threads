import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ThreadComponent } from '@/components/thread/thread';
import { db } from '@/lib/db';
import { Like, Thread, User } from '@prisma/client';
import { ContentTabsList } from './content-tabs-list';

type Prop = {
  user: User;
  sessionUser: User;
  defaultTab: string;
};

export async function Content({ user, sessionUser, defaultTab }: Prop) {
  const result = await db.thread.findMany({
    where: {
      author_id: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      Like: true,
      replied_by: true,
      reposts: true,
      reply_to: {
        include: {
          author: true,
          Like: true,
          replied_by: true,
          reposts: true,
          reply_to: {
            include: {
              author: true,
            },
          },
        },
      },
      repost_from: {
        include: {
          author: true,
          Like: true,
          replied_by: true,
          reposts: true,
          reply_to: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  const threads = result.filter((e) => e.reply_to_id === null);
  const replies = result.filter((e) => e.reply_to_id !== null);

  const revalidate_path = `/home/profile/${user.id}`;

  return (
    <Tabs
      defaultValue={defaultTab}
      className="w-full flex-grow grid grid-rows-[min-content_1fr] gap-2 overflow-auto"
    >
      <ContentTabsList />
      <TabsContent value="threads" className="h-full m-0 overflow-auto">
        {threads.map((thread, i) => {
          if (!!thread.repost_from) {
            return (
              <div className="mt-2" key={i}>
                <div className="flex items-center text-slate-500 gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                    />
                  </svg>
                  <p className="text-sm">You reposted</p>
                </div>

                <ThreadComponent
                  sessionUser={sessionUser}
                  revalidate_path={revalidate_path}
                  thread={thread.repost_from}
                  author={thread.repost_from.author}
                  likes={thread.repost_from.Like}
                  reposts={thread.repost_from.reposts}
                  replied_by={thread.repost_from.replied_by}
                  replying_to_author={thread.repost_from.reply_to?.author}
                  isRepost={true}
                  hyperlink={true}
                />
              </div>
            );
          }
          return (
            <ThreadComponent
              key={i}
              sessionUser={sessionUser}
              revalidate_path={revalidate_path}
              thread={thread}
              author={user}
              likes={thread.Like}
              reposts={thread.reposts}
              replied_by={thread.replied_by}
              hyperlink={true}
            />
          );
        })}
        {threads.length === 0 ? (
          <p className="italic tracking-wide text-center">
            No threads started yet.
          </p>
        ) : (
          <></>
        )}
      </TabsContent>
      <TabsContent value="replies" className="h-full m-0 overflow-auto">
        {replies.map((thread, i) => (
          <div key={i}>
            <ThreadComponent
              sessionUser={sessionUser}
              revalidate_path={revalidate_path}
              thread={thread.reply_to as Thread}
              author={thread.reply_to?.author as User}
              likes={thread.reply_to?.Like as Like[]}
              reposts={thread.reply_to?.reposts as Thread[]}
              replied_by={thread.reply_to?.replied_by as Thread[]}
              isToBeReplied={true}
              replying_to_author={thread.reply_to?.reply_to?.author}
              hyperlink={true}
            />
            <ThreadComponent
              sessionUser={sessionUser}
              revalidate_path={revalidate_path}
              thread={thread}
              author={user}
              likes={thread.Like}
              reposts={thread.reposts}
              replied_by={thread.replied_by}
              isReply={true}
              hyperlink={true}
            />
          </div>
        ))}
        {replies.length === 0 ? (
          <p className="italic tracking-wide text-center">
            No Replies yet.
          </p>
        ) : (
          <></>
        )}
      </TabsContent>
    </Tabs>
  );
}
