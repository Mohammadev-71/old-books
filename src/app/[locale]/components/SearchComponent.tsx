"use client";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SearchComponent() {
   const searchParams = useSearchParams();
   const initialQuery = searchParams.get("query") || "";
   const router = useRouter();
   const pathname = usePathname();
   const t = useTranslations("ui");

   const searchHandler = (form: HTMLFormElement) => {
      const formData = new FormData(form);
      const search = String(formData.get("query") ?? "").trim();
      const params = new URLSearchParams();
      if (search) {
         params.set("query", search);
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
   };


   return (
      <form
         onSubmit={(e) => {
         e.preventDefault();
         searchHandler(e.currentTarget);
         }}
         role="search"
         className="mx-auto flex w-full max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-inner shadow-black/10 backdrop-blur-sm"
      >
         <input
         type="text"
         name="query"
         key={initialQuery}
         defaultValue={initialQuery}
         placeholder={t("searchPlaceholder")}
         aria-label={t("searchPlaceholder")}
         className="min-w-0 flex-1 bg-transparent px-5 py-3 text-base text-white placeholder:text-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
         />
         <button
         className="min-w-14 px-5 text-lg text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
         type="submit"
         aria-label={t("searchButton")}
         title={t("searchButton")}
         >
         ⌕
         </button>
      </form>
   );
}
