import { getTranslations } from "next-intl/server";
import FavoritesButton from "./FavoritesButton";
import { Link as IntLink } from "@/src/i18n/navigation";
import { auth } from "@/src/utils/auth";
import { headers } from "next/headers";
import DeleteBookBtn from "./DeleteBookBtn";

// Create Book Data interface:
interface bookData {
   id: string;
   img?: string;
   title: string;
   description: string;
   createdAt: Date;
   authorId: string;
   favoritedBy?: any;
}
interface bookProp {
   book: bookData;
}

export default async function BookCard({ book }: bookProp) {
   const t = await getTranslations("book");

   // get user data form the session:
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   const isFav = book?.favoritedBy?.some(
      (fav: any) => fav.id === session?.user?.id,
   ) 

   return (
      <article
         key={book?.id}
         className="group relative flex min-h-[430px] min-w-[300px] max-w-[350px] flex-col overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-white shadow-[0_12px_30px_rgba(24,43,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(24,43,42,0.16)] dark:bg-[#1b302e]"
      >
         {/* Favorites button: */}
         <div className="absolute right-4 top-4 z-10">
         <FavoritesButton bookId={book?.id} isFav={isFav} />
         </div>

         {/* book img and link: */}
         <IntLink href={`/book/${book?.id}`}>
         <img
            src={
               book.img ||
               "https://m.media-amazon.com/images/I/61bfj+-wArL._SY466_.jpg"
            }
            alt="book"
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
         />
         </IntLink>

         {/* Book title */}
         <div className="flex flex-1 flex-col gap-3 p-5">
         <p className="font-serif text-xl font-bold leading-tight text-[var(--ink)] dark:text-[#f6f1e8]">
            {t("name")}: {book.title || "---"}
         </p>

         {/* Book description: */}
         <p className="line-clamp-3 text-sm leading-6 text-[var(--muted)] dark:text-[#b8c4c0]">
            {t("description")}: {book.description || "---"}
         </p>

         {/* book Date: */}
         <p className="mt-auto border-t border-[var(--line)] pt-3 text-xs font-medium text-[var(--muted)]">
            {t("date")}:{" "}
            {book.createdAt
               ? new Date(book.createdAt).toLocaleDateString()
               : "---"}
         </p>

         {/* Delete book button: */}
         {
            // check if the current user is the author of this book and show the delete button:
            session?.user?.id === book?.authorId && (
               <DeleteBookBtn bookId={book?.id} />
            )
         }
         </div>
      </article>
   );
}
