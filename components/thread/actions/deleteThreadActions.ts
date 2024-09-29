import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

const formSchema = z.object({
  thread_to_be_deleted_id: z.string().uuid(),
  revalidate_path: z.string().optional(),
});

export async function deleteThreadAction(data: FormData) {
  "use server";

  // validate inputs
  const dataObject = Object.fromEntries(data.entries());
  const { thread_to_be_deleted_id, revalidate_path } =
    formSchema.parse(dataObject);

  // validate session
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("unauthenicated");

  // check if thread exists & the user in session own the thread
  const dbThread = await db.thread.findFirst({
    where: {
      id: thread_to_be_deleted_id,
      author_id: session.user.id,
    },
  });

  if (!dbThread) {
    if (revalidate_path) revalidatePath(revalidate_path);
    return;
  }

  // if exists, delete
  await db.thread.delete({
    where: {
      id: thread_to_be_deleted_id,
    },
  });

  if (revalidate_path) revalidatePath(revalidate_path);

  // delete attachment on cloudinary
  if (dbThread.attachment) {
    await cloudinary.api.delete_resources([dbThread.attachment]);
  }
}
