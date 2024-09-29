import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const followActionFormSchema = z.object({
  user_to_be_followed_id: z.string(),
  revalidate_path: z.string().optional(),
});

export async function followAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { user_to_be_followed_id, revalidate_path } =
    followActionFormSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // check if the user wanted to follow him/herself
  if (user_to_be_followed_id === session.user.id) {
    throw new Error("disallowed to follow yourself");
  }

  // find if already following
  const dbFriendShip = await db.friendship.findFirst({
    where: {
      user_to_be_followed_id,
      user_requested_to_follow_id: session.user.id,
    },
  });

  // if exists
  if (dbFriendShip) {
    if (revalidate_path) revalidatePath(revalidate_path);
    return;
  }

  // create friendship

  const userToBeFollowed = await db.user.findFirst({
    where: { id: user_to_be_followed_id },
  });
  if (!userToBeFollowed) throw new Error("User to be followed does not exist");

  await db.friendship.create({
    data: {
      user_requested_to_follow_id: session.user.id,
      user_to_be_followed_id,
    },
  });

  // redirect
  if (revalidate_path) revalidatePath(revalidate_path);
}

const unfollowActionFormSchema = z.object({
  user_to_be_unfollowed_id: z.string(),
  revalidate_path: z.string().optional(),
});

export async function unfollowAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { user_to_be_unfollowed_id, revalidate_path } =
    unfollowActionFormSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // find if already following
  const dbFriendShip = await db.friendship.findFirst({
    where: {
      user_to_be_followed_id: user_to_be_unfollowed_id,
      user_requested_to_follow_id: session.user.id,
    },
  });
  if (!dbFriendShip) {
    if (revalidate_path) revalidatePath(revalidate_path);
    return;
  }

  // delete friendship to unfollow
  await db.friendship.delete({
    where: {
      id: dbFriendShip.id,
    },
  });

  // redirect
  if (revalidate_path) revalidatePath(revalidate_path);
}
