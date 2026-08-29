"use client";
import { useState } from "react";
import { shareBookHandler } from "../components/ShareBookHandler";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link as IntLink } from "@/src/i18n/navigation";


interface bookInterface {
  title: string;
  description: string;
  location: string;
}

export default function ShareBook() {
  const t = useTranslations("ui");
  const [book, setBook] = useState<bookInterface>({
    title: "",
    description: "",
    location: "",
  });

  const shareHandler = async () => {
    const result = await shareBookHandler({ book });
    if (result.success) {
      alert(result?.msg);
      redirect("/");
    } else {
      const errorValues = Object.values(result?.errors || {});
      alert(errorValues[0]?.[0]);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] px-5 py-10 dark:bg-[#122120] sm:px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          shareHandler();
        }}
        className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--line)] bg-white/80 p-6 shadow-[0_24px_70px_rgba(24,43,42,0.12)] dark:bg-[#1b302e]/90 sm:p-10"
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--coral)]">
          {t("shareEyebrow")}
        </p>
        <h1 className="mb-2 font-serif text-4xl font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
          {t("shareTitle")}
        </h1>
        <p className="mb-8 text-sm text-[var(--muted)]">
          {t("shareDescription")}
        </p>
        <div className="flex flex-col gap-3">
          <label className="text-sm font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("title")}
          </label>
          <input
            onChange={(e) => {
              setBook({ ...book, title: e.target.value });
            }}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base outline-none transition focus:border-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
            type="text"
          />

          <label className="text-sm font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("description")}
          </label>
          <input
            onChange={(e) => {
              setBook({ ...book, description: e.target.value });
            }}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base outline-none transition focus:border-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
            type="text"
          />

          <label className="text-sm font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("location")}
          </label>
          <input
            onChange={(e) => {
              setBook({ ...book, location: e.target.value });
            }}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base outline-none transition focus:border-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
            type="text"
          />

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-[var(--coral)] px-5 py-3 font-bold text-white transition hover:brightness-110"
            >
              {t("share")}
            </button>

            <IntLink href={"/"} className="rounded-xl border border-[var(--line)] px-5 py-3 font-bold text-[var(--muted)] transition hover:border-[var(--coral)] hover:text-[var(--coral)]">
              {t("cancel")}
            </IntLink>
          </div>
        </div>
      </form>
    </main>
  );
}
