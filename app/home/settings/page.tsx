import { BackButton } from '@/components/back-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="pt-2 flex flex-col">
      <div>
        <div className="flex justify-between py-1.5 px-4 items-center">
          <BackButton />
          <h1 className="font-bold">Settings</h1>
          <BackButton className="opacity-0 pointer-events-none" />
        </div>
        <Separator />
      </div>
      <div className="flex-grow grid grid-rows-[1fr_min-content] container">
        <div />
        <Button
          className="text-red-500 hover:text-red-500 w-full"
          variant={'outline'}
          asChild
        >
          <Link href={'/signout'}>Sign out pls</Link>
        </Button>
      </div>
    </div>
  );
}
