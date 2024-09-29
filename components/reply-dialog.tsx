"use client";

import { Thread, User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewThreadForm } from "./new-thread/form";
import { ReactNode } from "react";

type Prop = {
  thread: Thread;
  author: User;
  trigger: ReactNode;
  sessionUser: User;
  triggerClassName?: string;
};

export function ReplyDialog({
  thread,
  author,
  trigger,
  sessionUser,
  triggerClassName,
}: Prop) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Reply to{" "}
            <span className="underline-offset-2 underline">
              {author.user_name}
            </span>
          </DialogTitle>
        </DialogHeader>
        <NewThreadForm
          reply_to={thread}
          user={sessionUser}
          reply_to_author={author}
        />
      </DialogContent>
    </Dialog>
  );
}
