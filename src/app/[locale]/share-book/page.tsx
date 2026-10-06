"use client";
import { useState } from "react";
import { shareBookHandler } from "../components/ShareBookHandler";
import { useTranslations } from "next-intl";
import { Link as IntLink } from "@/src/i18n/navigation";
import { useRouter } from "@/src/i18n/navigation";


interface bookInterface {
  title: string;
  description: string;
  location: string;
}

export default function ShareBook() {
  const t = useTranslations("ui");
  const router = useRouter();
  const [book, setBook] = useState<bookInterface>({
    title: "",
    description: "",
    location: "",
  });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shareHandler = async () => {
    setFeedback("");
    setIsSubmitting(true);
    try {
      const result = await shareBookHandler({ book });
      if (result.success) {
        router.push("/");
      } else {
        const errorMessage =
          result.message ??
          Object.values(result.errors ?? {}).flat()[0] ??
          t("shareError");
        setFeedback(errorMessage);
      }
    } catch {
      setFeedback(t("shareError"));
    } finally {
      setIsSubmitting(false);
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
          <label htmlFor="book-title" className="text-sm font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("title")}
          </label>
          <input
            id="book-title"
            required
            maxLength={50}
            onChange={(e) => {
              setBook({ ...book, title: e.target.value });
            }}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base outline-none transition focus:border-[var(--coral)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
            type="text"
          />

          <label htmlFor="book-description" className="text-sm font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("description")}
          </label>
          <textarea
            id="book-description"
            required
            maxLength={500}
            rows={5}
            onChange={(e) => {
              setBook({ ...book, description: e.target.value });
            }}
            className="resize-y rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base leading-6 outline-none transition focus:border-[var(--coral)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
          />

          <label htmlFor="book-location" className="text-sm font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("location")}
          </label>
          <input
            id="book-location"
            required
            maxLength={500}
            onChange={(e) => {
              setBook({ ...book, location: e.target.value });
            }}
            className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-base outline-none transition focus:border-[var(--coral)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] dark:bg-[#122120] dark:text-[#f6f1e8]"
            type="text"
          />

          {feedback && (
            <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">
              {feedback}
            </p>
          )}

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-12 rounded-xl bg-[var(--coral)] px-6 font-bold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? t("loading") : t("share")}
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
