import prisma from "@/src/lib/prisma"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface PageProps {
   params: Promise<{ id: string }>
}


export default async function BookDetails({ params }: PageProps){

   const t = await getTranslations("bookDetails")

   // get the book id from params:
   const {id} = await params



   // get the book from database using prisma:
   const book = await prisma.book.findUnique({  
      where:{id:id},
      include: {
         author: true,
      }
   })

   if (!book) {
      notFound()
   }

   return (
      <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
         <article className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(24,43,42,0.1)] dark:bg-[#1b302e] md:grid-cols-[0.8fr_1.2fr]">
            <div
               aria-hidden="true"
               className="flex min-h-72 items-center justify-center bg-[linear-gradient(145deg,#0d5551,#183b39_58%,#e7795c)] text-[#f6f1e8] md:min-h-[34rem]"
            >
               <div className="flex h-72 w-48 items-center justify-center rounded-e-md border-s-4 border-[#f6f1e8]/50 bg-[#f6f1e8]/15 shadow-2xl">
                  <span className="font-serif text-7xl opacity-80">B</span>
               </div>
            </div>
            <div className="p-6 sm:p-10 lg:p-14">
               <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[var(--coral)]">
                  {t("eyebrow")}
               </p>
               <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] dark:text-[#f6f1e8] sm:text-4xl">
                  {book.title}
               </h1>
               <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-[var(--muted)] dark:text-[#b8c4c0]">
                  {book.description}
               </p>
               <dl className="mt-8 grid gap-5 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
                  <div>
                     <dt className="text-sm font-medium text-[var(--muted)]">{t("location")}</dt>
                     <dd className="mt-1 font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">{book.location || "—"}</dd>
                  </div>
                  <div>
                     <dt className="text-sm font-medium text-[var(--muted)]">{t("authName")}</dt>
                     <dd className="mt-1 font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">{book.author.name || "—"}</dd>
                  </div>
                  <div>
                     <dt className="text-sm font-medium text-[var(--muted)]">{t("authEmail")}</dt>
                     <dd className="mt-1 break-all font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">{book.author.email}</dd>
                  </div>
                  {book.author.phone !== null && (
                     <div>
                        <dt className="text-sm font-medium text-[var(--muted)]">{t("authPhone")}</dt>
                        <dd className="mt-1 font-semibold text-[var(--ink)] dark:text-[#f6f1e8]">{book.author.phone}</dd>
                     </div>
                  )}
               </dl>
            </div>
         </article>
      </main>
   )
}