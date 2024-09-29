"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

export function SignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") as string;

  function handler() {
    signIn("google", {
      callbackUrl: callbackUrl || `${SITE_URL}/home`,
    });
  }

  return (
    <Button variant={"outline"} onClick={handler}>
      <Image
        src="/google-logo.svg"
        alt=""
        width={22}
        height={22}
        className="mr-2"
      />
      Continue With Google
    </Button>
  );
}
