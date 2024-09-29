import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../api/auth/[...nextauth]/route";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// redirect user in the root page
export async function GET() {
  const session = await getServerSession(authOptions);

  // check if user is signed in
  if (session) return NextResponse.redirect(`${SITE_URL}/home`);

  return NextResponse.redirect(
    `${SITE_URL}/signin?callbackUrl=${SITE_URL}/home`
  );
}
