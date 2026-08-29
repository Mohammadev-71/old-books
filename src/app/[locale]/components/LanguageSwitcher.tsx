"use client";
import { useTranslations } from "next-intl";
import { Link as IntLink, usePathname, useRouter } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { authClient } from "@/src/lib/auth-client";
import { useEffect } from "react";

export default function LanguageSwitcher({ isAction }: { isAction: Boolean }) {
  const locale = useLocale();
  const t = useTranslations("navbar");
  const ui = useTranslations("ui");
  const pathName = usePathname();
  const router = useRouter();
  const nextLocale = locale === "en" ? "ar" : "en";
  const { data: session } = authClient.useSession();

  // check if user logged in and if the component have an action:
  useEffect(() => {
    const checkUserLanguage = () => {
      if (!isAction && session?.user) {
        router.replace(pathName, { locale: session?.user?.language });
        return null;
      }
    };
    checkUserLanguage();
  }, [session, pathName, router]);

  if (!isAction) {
    return;
  }

  return (
    !session?.user?.language && (
      <IntLink
        href={pathName}
        locale={nextLocale}
        className="rounded-xl bg-[var(--coral)] px-5 py-3 font-bold text-white transition hover:brightness-110"
      >
        {locale === "en" ? ui("arabic") : ui("english")}
      </IntLink>
    )
  );
}
