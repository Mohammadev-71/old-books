"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchComponent() {
   const searchParams = useSearchParams();
   const initialQuery = searchParams.get("query") || "";
   const router = useRouter();
   const pathname = usePathname();
   const [search, setSearch] = useState<string>(initialQuery);

   const searchHandler = () => {
      const params = new URLSearchParams();
      if (search) {
         params.set("query", search);
      }

      router.push(`${pathname}?${params.toString()}`);
   };


   return (
      <form
         onSubmit={(e) => {
         e.preventDefault();
         searchHandler();
         }}
         className="flex w-full overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-inner shadow-black/10 backdrop-blur-sm"
      >
         <input
         onChange={(e) => {
            setSearch(e.target.value);
         }}
         type="text"
         name="query"
         placeholder="Search"
         className="min-w-0 flex-1 bg-transparent px-5 py-3 text-base text-white placeholder:text-white/60 focus:outline-none"
         />
         <button
         className="px-5 text-lg text-white transition hover:bg-white/10"
         type="submit"
         aria-label="Search"
         >
         ⌕
         </button>
      </form>
   );
}
