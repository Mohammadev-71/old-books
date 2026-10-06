"use client";
import { useTranslations } from "next-intl";
import { Link as IntLink, usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { authClient } from "@/src/lib/auth-client";
import { useEffect } from "react";

export default function LanguageSwitcher({ isAction }: { isAction: boolean }) {
  const locale = useLocale();
  const ui = useTranslations("ui");
  const pathName = usePathname();
  const router = useRouter();
  const nextLocale = locale === "en" ? "ar" : "en";
  const { data: session } = authClient.useSession();

  // check if user logged in and if the component have an action:
  useEffect(() => {
    const checkUserLanguage = () => {
      if (!isAction && session?.user) {
        const preferredLocale = session.user.language;
        if (preferredLocale) {
          router.replace(pathName, { locale: preferredLocale });
        }
        return null;
      }
    };
    checkUserLanguage();
  }, [isAction, session, pathName, router]);

  if (!isAction) {
    return;
  }

  return (
    !session?.user?.language && (
      <IntLink
        href={pathName}
        locale={nextLocale}
        className="inline-flex h-11 items-center rounded-xl border border-white/25 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {locale === "en" ? ui("arabic") : ui("english")}
      </IntLink>
    )
  );
}
