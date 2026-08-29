"use client";
import deleteBookHandler from "./DeleteBookHandler";
import { useTranslations } from "next-intl";

export default function DeleteBookBtn({ bookId }: { bookId: string }) {
  const t = useTranslations("bookDetails");

  const deleteBook = async () => {
    const result = await deleteBookHandler({ bookId });

    alert(result?.msg);
    
  };

  return (
    <button
      className="mt-2 self-start rounded-full border border-(--coral) px-3 py-1.5 text-xs font-semibold text-(--coral) transition hover:bg-(--coral) hover:text-white"
      onClick={() => {
        deleteBook();
      }}
    >
      {t("deleteBtn")}
    </button>
  );
}
