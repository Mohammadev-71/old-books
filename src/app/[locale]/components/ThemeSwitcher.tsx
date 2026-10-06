"use client";

import { useTheme } from "next-themes";
import { authClient } from "@/src/lib/auth-client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function ThemeSwitcher({ isAction }: { isAction: boolean }) {
  const { setTheme, theme } = useTheme();
  const { data: session } = authClient.useSession();
  const t = useTranslations("ui");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session?.user?.theme) {
      setTheme(session.user.theme);
    }
  }, [session, setTheme]);

  if (!isAction || !mounted) {
    return null;
  }

  const nextTheme = theme === "dark" ? "light" : "dark";
  if(session && session.user){
    return;
  }
  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
      title={theme === "dark" ? t("switchToLight") : t("switchToDark")}
      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-lg text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}