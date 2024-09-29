import { Session } from "next-auth";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { ZodError, z } from "zod";

const namesSchema = z.object({
  displayName: z.string().min(6).max(30),
  userName: z.string().trim().toLowerCase().min(6).max(30),
});

const CLOUDINARY_CLOUD_NAME = process.env
  .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function useSubmit(
  avatar: string | File | null,
  isAvatarChanged: boolean,
  _displayName: string,
  _userName: string,
  bio: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string>>,
  session: Session
) {
  const handler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // validate names
      const { userName, displayName } = namesSchema.parse({
        displayName: _displayName,
        userName: _userName,
      });

      // upload names & avatar
      if (!isAvatarChanged) {
        const res = await fetch("/customize-profile/api/update", {
          method: "POST",
          body: JSON.stringify({
            display_name: displayName,
            user_name: userName,
            bio,
          }),
        });
        if (!res.ok) {
          throw new Error((await res.json()).message || "unknown server error");
        }
      } else if (avatar instanceof File) {
        // upload to server & get signature for cloudinary
        const res = await fetch("/customize-profile/api/update", {
          method: "POST",
          body: JSON.stringify({
            avatar_type: "file",
            display_name: displayName,
            user_name: userName,
            bio,
          }),
        });
        if (!res.ok) {
          throw new Error((await res.json()).message || "unknown server error");
        }

        const resData = await res.json();
        const timestamp = resData.timestamp as string;
        const signature = resData.signature as string;
        const public_id = resData.public_id as string;

        // upload to cloudinary
        const formData = new FormData();
        formData.append("file", avatar);
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
      } else if (typeof avatar === "string") {
        const res = await fetch("/customize-profile/api/update", {
          method: "POST",
          body: JSON.stringify({
            avatar_type: "url",
            avatar_value: avatar,
            display_name: displayName,
            user_name: userName,
            bio,
          }),
        });
        if (!res.ok) {
          throw new Error((await res.json()).message || "unknown server error");
        }
      } else {
        const res = await fetch("/customize-profile/api/update", {
          method: "POST",
          body: JSON.stringify({
            display_name: displayName,
            user_name: userName,
            avatar_type: "default",
            bio,
          }),
        });
        if (!res.ok) {
          throw new Error((await res.json()).message || "unknown server error");
        }
      }

      window.location.href = `${SITE_URL}/home/profile/${session.user.id}`;
    } catch (e) {
      if (e instanceof ZodError) {
        setError(`${e.errors[0].path}: ${e.errors[0].message}`);
      } else if (e instanceof Error) {
        setError(e.message || "unknown error");
      } else {
        setError("unknown error");
      }
      setIsLoading(false);
    }
  };

  return handler;
}
