import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NewThreadForm } from "@/components/new-thread/form";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Session, getServerSession } from "next-auth";

export default async function NewPage() {
  const session = (await getServerSession(authOptions)) as Session;
  const dbUser = await db.user.findFirstOrThrow({
    where: { id: session.user.id },
  });

  return (
    <div className="h-full grid grid-rows-[min-content_1fr]">
      <div>
        <h2 className="text-center py-2 font-semibold text-lg">New thread</h2>
        <Separator />
      </div>
      <div className="container pt-8">
        <NewThreadForm user={dbUser} />
      </div>
    </div>
  );
}
