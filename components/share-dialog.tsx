'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

type Prop = {
  trigger: ReactNode;
  url: string;
};

export function ShareDialog({ trigger, url }: Prop) {
  function copyLinkHandler() {
    navigator.clipboard.writeText(url);
  }

  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Share with your friends!</DialogDescription>
        </DialogHeader>

        <Button
          variant={'secondary'}
          className="py-8 flex gap-2"
          type="submit"
          onClick={copyLinkHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
