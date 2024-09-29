"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar() {
  const pathname = usePathname();
  const [query, setQuery] = useState(
    pathname.replace("/home/search", "").replace("/", "")
  );
  const router = useRouter();

  const onSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/home/search/${query}`);
  };

  return (
    <form onSubmit={onSumit}>
      <Input
        placeholder="Type here to search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
