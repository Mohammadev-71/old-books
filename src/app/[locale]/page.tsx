export const dynamic = "force-dynamic";
import prisma from "@/src/lib/prisma";
import BookCard from "./components/BookCard";
import { auth } from "@/src/utils/auth";
import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { query } = await searchParams;
  const normalizedQuery = query?.trim();
  const t = await getTranslations("library");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: normalizedQuery
        ? [
            {
              title: {
                contains: normalizedQuery,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: normalizedQuery,
                mode: "insensitive",
              },
            },
            {
              location: {
                contains: normalizedQuery,
                mode: "insensitive",
              },
            },
          ]
        : undefined,
    },
    include: {
      favoritedBy: {
        select: { id: true },
      },
    },
  });

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 border-b border-[var(--line)] pb-5">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[var(--coral)]">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--ink)] dark:text-[#f6f1e8] sm:text-5xl">
            {normalizedQuery || t("title")}
          </h1>
        </div>
        <span className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] sm:inline-block">
          {t("count", { count: books.length })}
        </span>
      </div>
      {books.length > 0 ? (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              currentUserId={session?.user.id}
            />
          ))}
        </div>
      ) : (
        <section className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center">
          <span aria-hidden="true" className="mb-5 text-5xl">✦</span>
          <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">
            {t(normalizedQuery ? "noResultsTitle" : "emptyTitle")}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
            {t(normalizedQuery ? "noResultsDescription" : "emptyDescription")}
          </p>
        </section>
      )}
    </main>
  );
}
