"use client";

import { convertFileToBase64Url } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, ChangeEvent, useRef } from "react";
import { Button } from "../ui/button";

type Prop = {
  isLoading: boolean;
  setAttachment: Dispatch<SetStateAction<File | null>>;
};

export function AttachmentEditor({ setAttachment, isLoading }: Prop) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>();

  async function pictureChosenHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    // set attachment value to the file
    const file = e.target.files[0];
    setAttachment(file);

    // for attachment preview
    const base64Url = await convertFileToBase64Url(file);
    setAttachmentUrl(base64Url);
  }

  function removeAttachmentHandler() {
    setAttachment(null);
    setAttachmentUrl(null);
  }

  return (
    <>
      {attachmentUrl ? (
        <div className="relative">
          <Image
            src={attachmentUrl}
            alt=""
            width={406}
            height={360}
            className="max-h-[360px] rounded object-cover object-center"
          />
          <Button
            variant={"secondary"}
            size={"icon"}
            className="absolute right-2 top-2"
            type="button"
            onClick={removeAttachmentHandler}
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Button>
        </div>
      ) : (
        <Button
          variant={"ghost"}
          className="hover:bg-transparent text-slate-500"
          size={"icon"}
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
        </Button>
      )}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept="image/png,image/jpeg,image/gif"
        onChange={pictureChosenHandler}
        onClick={(e) => {
          e.currentTarget.value = "";
        }}
      />
    </>
  );
}
