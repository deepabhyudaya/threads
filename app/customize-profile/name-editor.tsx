'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dispatch, SetStateAction } from 'react';

type Prop = {
  displayName: string;
  setDisplayName: Dispatch<SetStateAction<string>>;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};

export function NameEditor({
  displayName,
  setDisplayName,
  userName,
  setUserName,
  isLoading,
}: Prop) {
  return (
    <div className="w-full max-w-xs flex flex-col mx-auto gap-3">
      <div className="flex flex-col w-full gap-1.5">
        <Label htmlFor="display-name">Display Name</Label>
        <Input
          type="text"
          id="display-name"
          placeholder="Deep"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={isLoading}
        />
        <Label
          htmlFor="display-name"
          className="text-xs font-normal text-slate-500 indent-1"
        >
          min:6; max:30;
        </Label>
      </div>
      <div className="flex flex-col w-full gap-1.5">
        <Label htmlFor="user-name">User Name</Label>
        <Input
          type="text"
          id="user-name"
          placeholder="deep.adv"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={isLoading}
        />
        <Label
          htmlFor="user-name"
          className="text-xs font-normal text-slate-500 indent-1"
        >
          min:6; max:30; lower case only; no whitespace;
        </Label>
      </div>
    </div>
  );
}
