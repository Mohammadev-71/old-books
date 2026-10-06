import { auth } from "@/src/utils/auth";
import prisma from "@/src/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BookCard from "../components/BookCard";

export default async function Favorites() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const [user, t] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        favBooks: {
          include: {
            favoritedBy: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    }),
    getTranslations("collections"),
  ]);
  const books = user?.favBooks ?? [];

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-[var(--line)] pb-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--coral)]">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--ink)] dark:text-[#f6f1e8] sm:text-5xl">
            {t("favoritesTitle")}
          </h1>
        </header>
        {books.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                currentUserId={session.user.id}
              />
            ))}
          </div>
        ) : (
          <section className="flex flex-col items-center px-5 py-24 text-center">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
              {t("emptyFavoritesTitle")}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
              {t("emptyFavoritesDescription")}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
