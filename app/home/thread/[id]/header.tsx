import { BackButton } from "@/components/back-button";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <BackButton />
        <h2 className="text-center py-3 font-semibold text-lg">Thread</h2>
        <BackButton className="opacity-0 pointer-events-none" />
      </div>

      <Separator />
    </div>
  );
}
