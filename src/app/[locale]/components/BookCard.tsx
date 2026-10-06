import { getTranslations } from "next-intl/server";
import FavoritesButton from "./FavoritesButton";
import { Link as IntLink } from "@/src/i18n/navigation";
import DeleteBookBtn from "./DeleteBookBtn";
import type { Prisma } from "@/src/generated/prisma/client";

type BookCardData = Prisma.BookGetPayload<{
  include: {
    favoritedBy: {
      select: { id: true };
    };
  };
}>;

export default async function BookCard({
  book,
  currentUserId,
}: {
  book: BookCardData;
  currentUserId?: string;
}) {
  const t = await getTranslations("book");
  const isFav = book.favoritedBy.some(
    (favorite) => favorite.id === currentUserId,
  );

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_12px_30px_rgba(24,43,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(24,43,42,0.16)] dark:bg-[#1b302e]">
      <div className="relative">
        <IntLink
          href={`/book/${book.id}`}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--coral)]"
        >
          <div
            aria-hidden="true"
            className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#0d5551,#183b39_58%,#e7795c)] text-[#f6f1e8]"
          >
            <div className="flex h-[72%] w-[46%] items-center justify-center rounded-e-md border-s-4 border-[#f6f1e8]/50 bg-[#f6f1e8]/15 shadow-2xl transition duration-500 group-hover:scale-105">
              <span className="font-serif text-5xl opacity-80">B</span>
            </div>
          </div>
        </IntLink>
        {currentUserId && (
          <div className="absolute end-4 top-4 z-10">
            <FavoritesButton bookId={book.id} isFav={isFav} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="line-clamp-2 font-serif text-xl font-bold leading-tight text-[var(--ink)] dark:text-[#f6f1e8]">
          {book.title}
        </h2>

        <p className="line-clamp-3 text-sm leading-6 text-[var(--muted)] dark:text-[#b8c4c0]">
          {book.description}
        </p>
        {book.location && (
          <p className="truncate text-sm text-[var(--muted)]">
            <span className="me-1" aria-hidden="true">
              ⌖
            </span>
            {book.location}
          </p>
        )}
        <p className="mt-auto border-t border-[var(--line)] pt-3 text-xs font-medium text-[var(--muted)]">
          {t("date")}: {new Intl.DateTimeFormat().format(book.createdAt)}
        </p>
        {currentUserId === book.authorId && <DeleteBookBtn bookId={book.id} />}
      </div>
    </article>
  );
}
