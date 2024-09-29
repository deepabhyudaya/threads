import { BackButton } from "@/components/back-button";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPage() {
  return (
    <div className="pt-2 flex flex-col">
      <div className="flex justify-between py-1.5 px-4 items-center">
        <BackButton />
        <h1 className="font-bold">Privacy</h1>
        <BackButton className="opacity-0 pointer-events-none" />
      </div>
      <Separator />
      <div className="flex flex-col container py-4">
        <p className="text-center">Nothing Out There</p>
      </div>
    </div>
  );
}
