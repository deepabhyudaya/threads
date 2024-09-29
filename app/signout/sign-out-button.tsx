"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function SignOutButton() {
  function handler() {
    signOut({
      callbackUrl: `/signin?callbackUrl=${SITE_URL}/home`,
    });
  }

  return (
    <Button variant={"outline"} onClick={handler}>
      Continue To Sign Out
    </Button>
  );
}
