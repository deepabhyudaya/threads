import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const likeThreadSchema = z.object({
  thread_to_be_liked_id: z.string().uuid(),
  revalidate_path: z.string().optional(),
});

export async function likeThreadAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { thread_to_be_liked_id, revalidate_path } =
    likeThreadSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // check if liked already
  const dbLike = await db.like.findFirst({
    where: {
      thread_id: thread_to_be_liked_id,
      user_id: session.user.id,
    },
  });

  if (dbLike) {
    if (revalidate_path) revalidatePath(revalidate_path);
    return;
  }

  // like
  await db.like.create({
    data: {
      thread_id: thread_to_be_liked_id,
      user_id: session.user.id,
    },
  });

  if (revalidate_path) revalidatePath(revalidate_path);
}

const unlikeThreadSchema = z.object({
  thread_to_be_unliked_id: z.string().uuid(),
  revalidate_path: z.string().optional(),
});

export async function unlikeThreadAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { thread_to_be_unliked_id, revalidate_path } =
    unlikeThreadSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // check if unliked already
  const dbLike = await db.like.findFirst({
    where: {
      thread_id: thread_to_be_unliked_id,
      user_id: session.user.id,
    },
  });

  if (!dbLike) {
    if (revalidate_path) revalidatePath(revalidate_path);
    return;
  }

  // like
  await db.like.deleteMany({
    where: {
      thread_id: thread_to_be_unliked_id,
      user_id: session.user.id,
    },
  });

  if (revalidate_path) revalidatePath(revalidate_path);
}
