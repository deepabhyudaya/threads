'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Thread, User } from '@prisma/client';
import { useState } from 'react';
import { useSubmit } from './use-submit';
import Image from 'next/image';
import { UserAvatar } from '@/components/user-avatar';
import { AttachmentEditor } from './attachment-editor';

type Prop = {
  user: User;
  reply_to?: Thread;
  reply_to_author?: User;
};

export function NewThreadForm({ user, reply_to, reply_to_author }: Prop) {
  // file input ref
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useSubmit(
    content,
    attachment,
    setIsLoading,
    setError,
    user,
    reply_to
  );

  return (
    <form
      className="h-full flex flex-col gap-4 justify-between"
      onSubmit={onSubmit}
    >
      <div className="flex gap-4 overflow-visible">
        {/* avatar */}
        <div className="grid grid-rows-[min-content_1fr] gap-2">
          <UserAvatar
            avatar_type={user.avatar_type}
            avatar_value={user.avatar_value}
          />
          <div className="h-full w-[2px] bg-slate-100 mx-auto" />
        </div>

        {/* name, textarea and attachment*/}
        <div className="w-full flex flex-col gap-2 overflow-visible">
          <p className="font-medium leading-none">{user.user_name}</p>
          <Textarea
            className="h-60"
            placeholder={
              reply_to
                ? `Reply to ${reply_to_author?.user_name}...`
                : 'Naya thread banao...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          <AttachmentEditor
            setAttachment={setAttachment}
            isLoading={isLoading}
          />
          {error ? <p className="text-red-500 text-sm">{error}</p> : <></>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Image
              src={'/loading-bg-primary.svg'}
              alt=""
              width={22}
              height={22}
            />
          ) : (
            'Post'
          )}
        </Button>
      </div>
    </form>
  );
}
