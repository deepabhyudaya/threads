import { getAvatarUrl } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function UserAvatar({
  avatar_type,
  avatar_value,
  className,
}: {
  avatar_type: "File" | "Url" | "Default";
  avatar_value?: string | null;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={getAvatarUrl({
          avatar_type,
          avatar_value,
        })}
        referrerPolicy="no-referrer"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
