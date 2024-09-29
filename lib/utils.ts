import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToBase64Url = (file: File) =>
  new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  }) as Promise<string>;

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const getAvatarUrl = ({
  avatar_type,
  avatar_value,
  width,
  height,
  defaultValue,
}: {
  avatar_type: "File" | "Url" | "Default";
  avatar_value?: string | null;
  width?: number;
  height?: number;
  defaultValue?: any;
}) => {
  if (avatar_type === "File") {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${
      width?.toString() || "40"
    },h_${height?.toString() || "40"},c_fill/${avatar_value}`;
  }
  if (avatar_type === "Url") {
    return avatar_value as string;
  }
  return defaultValue || "/user.svg";
};
