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
   

   return (
      <header className="border-b border-white/10 bg-[var(--teal)] px-5 py-4 text-white shadow-[0_10px_30px_rgba(13,85,81,0.16)] sm:px-8 lg:px-12">
         <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <IntLink
               href="/"
               locale={locale}
               className="font-serif text-2xl font-bold tracking-tight text-[#f6f1e8] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
               {t("title")}
            </IntLink>
            <nav
               aria-label={t("navigationLabel")}
               className="order-3 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm font-semibold sm:order-2 sm:w-auto sm:gap-x-6"
            >
               {[
                  ["/", "home"],
                  ["/favorites", "favorites"],
                  ["/share-book", "share"],
                  ["/profile", "profile"],
                  ["/login", "login"],
               ].map(([href, label]) => (
                  <IntLink
                     key={href}
                     href={href}
                     aria-current={pathName === href ? "page" : undefined}
                     className={`relative py-1 after:absolute after:-bottom-1 after:inset-x-0 after:h-0.5 after:bg-[var(--coral)] after:transition-transform after:duration-300 ${
                        pathName === href ? "after:scale-x-100" : "after:scale-x-0"
                     } hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
                  >
                     {t(`headerLinks.${label}`)}
                  </IntLink>
               ))}
            </nav>
            <div className="order-2 ms-auto flex items-center gap-2 sm:order-3 sm:ms-0">
               <ThemeSwitcher isAction />
               <LanguageSwitcher isAction />
            </div>
         </div>
         {pathName !== "/profile" && (
            <div className="mx-auto mt-4 max-w-7xl">
               <SearchComponent />
            </div>
         )}
      </header>
   );
}
