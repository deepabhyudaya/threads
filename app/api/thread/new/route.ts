import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import cloudinary from "@/lib/cloudinary";

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string;

const formSchema = z.object({
  content: z.string(),
  with_attachment: z.boolean().default(false),
  reply_to_id: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { content, with_attachment, reply_to_id } = formSchema.parse(data);

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  if (with_attachment) {
    // generate signature for the attachment
    const timestamp = Math.round(Date.now() / 1000).toString();
    const public_id = uuid();
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, public_id },
      CLOUDINARY_API_SECRET
    );

    await db.thread.create({
      data: {
        content,
        author_id: session.user.id,
        attachment: public_id,
        reply_to_id,
      },
    });

    return NextResponse.json({
      attachment: {
        timestamp,
        public_id,
        signature,
      },
    });
  }

  // for case with no attachment
  await db.thread.create({
    data: {
      content,
      author_id: session.user.id,
      reply_to_id,
    },
  });

  return NextResponse.json({});
}
