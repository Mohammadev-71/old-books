"use client";
import { useTranslations } from "next-intl";
import { Link as IntLink, usePathname } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchComponent from "./SearchComponent";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
   const locale = useLocale();
   const t = useTranslations("navbar");
   const pathName = usePathname();
   if (
      pathName === "/login" ||
      pathName === "/signup"
   ) {
      return null;
   }
   

   console.log(pathName)

   return (
      <header className="border-b border-white/10 bg-[var(--teal)] px-5 py-5 text-white shadow-[0_10px_30px_rgba(13,85,81,0.16)] sm:px-8 lg:px-12">
         <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
         <p className="cursor-pointer font-serif text-2xl font-bold tracking-tight text-[#f6f1e8]">
            {t("title")}
         </p>
         <nav className="order-3 flex w-full items-center justify-center gap-5 text-sm font-semibold sm:order-2 sm:w-auto sm:gap-7">
            <IntLink href={"/"} locale={locale}>
               <p
               className={`relative cursor-pointer after:absolute after:-bottom-2 after:right-0 after:left-0 after:h-0.5 after:bg-[var(--coral)] after:transition-all after:duration-300 ${pathName === "/" ? "after:w-full" : "after:w-0"} hover:after:w-full`}
               >
               {t("headerLinks.home")}
               </p>
            </IntLink>

            <IntLink href={"/favorites"}>
               <p
               className={`relative cursor-pointer after:absolute after:-bottom-2 after:right-0 after:left-0 after:h-0.5 after:bg-[var(--coral)] after:transition-all after:duration-300 ${pathName === "/favorites" ? "after:w-full" : "after:w-0"} hover:after:w-full`}
               >
               {t("headerLinks.favorites")}
               </p>
            </IntLink>

            <IntLink href={"/share-book"}>
               <p
               className={`relative cursor-pointer after:absolute after:-bottom-2 after:right-0 after:left-0 after:h-0.5 after:bg-[var(--coral)] after:transition-all after:duration-300 ${pathName === "/share-book" ? "after:w-full" : "after:w-0"} hover:after:w-full`}
               >
               {t("headerLinks.share")}
               </p>
            </IntLink>

            <IntLink href={"/profile"}>
               <p
               className={`relative cursor-pointer after:absolute after:-bottom-2 after:right-0 after:left-0 after:h-0.5 after:bg-[var(--coral)] after:transition-all after:duration-300 ${pathName === "/profile" ? "after:w-full" : "after:w-0"} hover:after:w-full`}
               >
               {t("headerLinks.profile")}
               </p>
            </IntLink>

            <IntLink href={"/login"}>
               <p
               className={`relative cursor-pointer after:absolute after:-bottom-2 after:right-0 after:left-0 after:h-0.5 after:bg-[var(--coral)] after:transition-all after:duration-300 ${pathName === "/login" ? "after:w-full" : "after:w-0"} hover:after:w-full`}
               >
               {t("headerLinks.login")}
               </p>
            </IntLink>
         </nav>

         <div className="order-2 flex items-center gap-2 sm:order-3">
            <ThemeSwitcher isAction={true} />

            <LanguageSwitcher isAction={true} />
         </div>
         </div>
         <div className="mx-auto mt-7 max-w-3xl">
            
            {
               
               pathName==="/profile"?null:<SearchComponent />
            }
            
         </div>
      </header>
   );
}
