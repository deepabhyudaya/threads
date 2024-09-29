import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const repostActionSchema = z.object({
  thread_to_be_reposted_id: z.string().uuid(),
  revalidate_path: z.string().optional(),
});

export async function repostAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { thread_to_be_reposted_id, revalidate_path } =
    repostActionSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // check if a repost exists
  const dbRepost = await db.thread.findFirst({
    where: {
      author_id: session.user.id,
      repost_from_id: thread_to_be_reposted_id,
    },
  });

  if (dbRepost) return;

  // if not, repost
  await db.thread.create({
    data: {
      author_id: session.user.id,
      content: "",
      repost_from_id: thread_to_be_reposted_id,
    },
  });

  if (revalidate_path) revalidatePath(revalidate_path);
}

const removeRepostActionSchema = z.object({
  thread_that_have_been_reposted_id: z.string().uuid(),
  revalidate_path: z.string().optional(),
});

export async function removeRepostAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { thread_that_have_been_reposted_id, revalidate_path } =
    removeRepostActionSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // check if a repost exists
  const dbRepost = await db.thread.findFirst({
    where: {
      author_id: session.user.id,
      repost_from_id: thread_that_have_been_reposted_id,
    },
  });

  if (!dbRepost) {
    if (revalidate_path) revalidatePath(revalidate_path);
    return;
  }

  // if exist, delete it
  await db.thread.deleteMany({
    where: {
      author_id: session.user.id,
      repost_from_id: thread_that_have_been_reposted_id,
    },
  });

  if (revalidate_path) revalidatePath(revalidate_path);
}
