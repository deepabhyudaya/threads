"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export function ContentTabsList() {
  const router = useRouter();
  const pathname = usePathname();

  // so as to remain the same tab when user  the page
  function changeDefaultTab(dialog: string) {
    router.push(`${pathname}?tab=${dialog}`);
  }

  return (
    <TabsList className="w-full grid grid-cols-2">
      <TabsTrigger value="threads" onClick={() => changeDefaultTab("threads")}>
        Threads
      </TabsTrigger>
      <TabsTrigger value="replies" onClick={() => changeDefaultTab("replies")}>
        Replies
      </TabsTrigger>
    </TabsList>
  );
}
