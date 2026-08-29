export const dynamic = "force-dynamic";
import prisma from "@/src/lib/prisma";
import BookCard from "./components/BookCard";
import { title } from "node:process";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { query } = await searchParams;

  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: query
        ? [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              location: {
                contains: query,
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
            Library / 01
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--ink)] dark:text-[#f6f1e8] sm:text-5xl">
            {query ? query : ""}
          </h1>
        </div>
        <span className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] sm:inline-block">
          {books.length} books
        </span>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
