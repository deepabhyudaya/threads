import { getServerSession } from "next-auth";
import { CustomizeProfileForm } from "./form";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BackButton } from "@/components/back-button";

export default async function CustomizeProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const dbUser = await db.user.findFirstOrThrow({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className="container h-full grid items-center relative">
      {dbUser.isProfileCustomized ? (
        <BackButton className="absolute left-10 top-6" />
      ) : (
        <></>
      )}
      <CustomizeProfileForm user={dbUser} session={session} />
    </div>
  );
}
