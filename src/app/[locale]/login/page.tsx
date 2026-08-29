"use client";

import { useTranslations } from "next-intl";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { usePathname } from "@/src/i18n/navigation";
import { useLocale } from "next-intl";
import { Link as IntLink } from "@/src/i18n/navigation";
import { authClient } from "@/src/lib/auth-client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("login");
  const ui = useTranslations("ui");
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const pathName = usePathname();
  const nextLocale = locale === "en" ? "ar" : "en";
  const { data: session } = authClient.useSession();

  if (session) {
    redirect("/profile");
  }

  interface user {
    email: string;
    password: string;
  }
  const [userData, setUserData] = useState<user>({ email: "", password: "" });

  const LoginHandler = async () => {
    await authClient.signIn.email(
      {
        email: userData.email,
        password: userData.password,
        callbackURL: "/profile",
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess(ctx) {
          setIsLoading(false);
          alert(ui("loginSuccess"));
        },
        onError(ctx) {
          setIsLoading(false);
          alert(ctx.error.message);
        },
      },
    );
  };

  useEffect(() => {}, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--paper)] px-5 py-10 dark:bg-[#122120] sm:px-8">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--coral)]/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[var(--teal)]/20 blur-3xl" />
      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/80 shadow-[0_24px_70px_rgba(24,43,42,0.16)] backdrop-blur-sm dark:bg-[#1b302e]/90 md:grid-cols-[0.85fr_1.15fr]">
        <div className="hidden flex-col justify-between bg-[var(--teal)] p-10 text-[#f6f1e8] md:flex">
          <p className="max-w-xs font-serif text-4xl leading-tight">
            {ui("loginStatement")}
          </p>
          <span className="text-xs uppercase tracking-[0.24em] text-white/60">
            {ui("loginTagline")}
          </span>
        </div>
        <div className="p-6 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--coral)]">
                {ui("loginEyebrow")}
              </p>
              <h1 className="font-serif text-4xl font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
                {t("title")}
              </h1>
            </div>
            <ThemeSwitcher isAction={true} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              LoginHandler();
            }}
            className="flex flex-col gap-5"
          >
            <input
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
              type="text"
              placeholder={t("email-placeholder")}
            />
            <input
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
              type="text"
              placeholder={t("password-placeholder")}
            />
            <div className="text-sm text-[var(--muted)]">
              <p>{t("have-account")}</p>
              <IntLink href={"/signup"}>
                <p className="mt-1 font-semibold text-[var(--teal)] underline decoration-[var(--coral)] decoration-2 underline-offset-4 dark:text-[#f6f1e8]">
                  {t("create-acc-link")}
                </p>
              </IntLink>
            </div>

            <button
              type="submit"
              className="mt-3 rounded-xl bg-[var(--coral)] px-5 py-3 font-bold text-white transition hover:brightness-110"
            >
              {isLoading ? ui("loading") : t("title")}
            </button>

            <IntLink
              href={pathName}
              locale={nextLocale}
              className="text-center text-sm font-semibold text-[var(--teal)] hover:text-[var(--coral)] dark:text-[#f6f1e8]"
            >
              {locale === "en" ? ui("arabic") : ui("english")}
            </IntLink>
          </form>
        </div>
      </section>
    </main>
  );
}
