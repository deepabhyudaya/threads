import { ReactNode } from "react";
import { SearchBar } from "./search-bar";

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container h-full grid grid-rows-[min-content_1fr] gap-4 pt-6 overflow-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Search</h1>
        <SearchBar />
      </div>
      {children}
    </div>
  );
}
