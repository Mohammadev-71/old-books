"use client";
import { toggleFavorite } from "./toggleFavorite";

export default function FavoritesButton({
   bookId,
   isFav,
}: {
   bookId: string;
   isFav: Boolean;
}) {
   const handlerFavorite = async () => {
      await toggleFavorite({ bookId });
   };

   return (
      <button
         onClick={() => {
         handlerFavorite();
      }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg shadow-md transition hover:scale-105 disabled:opacity-50"
      >
      {isFav ? "❤️" : "🤍"}
      </button>
   );
}
