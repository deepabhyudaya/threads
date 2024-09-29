import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import cloudinary from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { z } from "zod";

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;

const formSchema = z.object({
  avatar_type: z.string().optional(),
  avatar_value: z.string().url().optional(),
  display_name: z.string().min(6).max(30),
  user_name: z.string().trim().toLowerCase().min(6).max(30),
  bio: z.string(),
});

export async function POST(request: Request) {
  // validation
  const body = await request.json();
  const { avatar_type, avatar_value, display_name, user_name, bio } =
    formSchema.parse(body);
  if (avatar_type === "url" && !avatar_value)
    return NextResponse.json({}, { status: 400 });

  // update names
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const res = await db.user.findFirst({
    where: {
      id: {
        not: {
          equals: session.user.id,
        },
      },
      user_name,
    },
  });
  if (res)
    return NextResponse.json(
      { message: "This user name has been taken by others." },
      { status: 400 }
    );

  const dbUser = await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      display_name,
      user_name,
      bio,
      isProfileCustomized: true,
    },
  });

  // if no need to set avatar, return
  if (!avatar_type) return NextResponse.json({});

  // delete old avatar file if necessary
  if (dbUser.avatar_type === "File") {
    const oldAvatarPublicId = dbUser.avatar_value as string;
    await cloudinary.api.delete_resources([oldAvatarPublicId]);
  }

  // switch cases
  if (avatar_type === "file") {
    // generate signature
    const timestamp = Math.round(Date.now() / 1000).toString();
    const public_id = uuid();
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, public_id },
      CLOUDINARY_API_SECRET
    );

    // update to database
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        avatar_type: "File",
        avatar_value: public_id,
      },
    });

    return NextResponse.json({ timestamp, signature, public_id });
  } else if (avatar_type === "url") {
    // update to database
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        avatar_type: "Url",
        avatar_value: avatar_value,
      },
    });

    return NextResponse.json({});
  } else if (avatar_type === "default") {
    // update to database
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        avatar_type: "Default",
        avatar_value: null,
      },
    });

    return NextResponse.json({});
  }
}
