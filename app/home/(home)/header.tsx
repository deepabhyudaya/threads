'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export function Header() {
  return (
    <div>
      <div className="flex justify-center py-3">
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          <Image src={'/logo.png'} alt="" width={36} height={36} />
        </button>
      </div>
      <Separator />
    </div>
  );
}
