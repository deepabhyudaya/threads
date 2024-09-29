import { Thread, User } from "@prisma/client";
import { Dispatch, FormEvent, SetStateAction } from "react";

const CLOUDINARY_CLOUD_NAME = process.env
  .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function useSubmit(
  content: string,
  attachment: File | null,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  user: User,
  reply_to?: Thread
) {
  const handler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // validate content
      if (content.trim() === "") {
        throw new Error("content is not allowed to be empty.");
      }

      // upload to server
      const res = await fetch("/api/thread/new", {
        method: "POST",
        body: JSON.stringify({
          content,
          with_attachment: !!attachment,
          reply_to_id: reply_to?.id || undefined,
        }),
      });

      if (attachment) {
        // upload to server & get signature for cloudinary
        const resData = await res.json();
        const { timestamp, public_id, signature } = resData.attachment as {
          timestamp: string;
          public_id: string;
          signature: string;
        };

        // upload attachment to cloudinary
        const formData = new FormData();
        formData.append("file", attachment);
        formData.append("api_key", CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("public_id", public_id);

        await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
      }

      if (reply_to)
        window.location.href = `${SITE_URL}/home/thread/${reply_to.id}`;
      else window.location.href = `${SITE_URL}/home/profile/${user.id}`;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("unknown error");
      }
      setIsLoading(false);
    }
  };

  return handler;
}
