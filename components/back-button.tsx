"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";

type Prop = { className?: clsx.ClassValue };

export function BackButton({ className }: Prop) {
  const router = useRouter();

  function backButtonHandler() {
    router.back();
  }

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "p-0 flex items-center hover:bg-transparent",
        className || ""
      )}
      onClick={backButtonHandler}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <p className="text-base">Back</p>
    </Button>
  );
}
