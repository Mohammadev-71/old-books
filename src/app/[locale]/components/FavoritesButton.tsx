"use client";
import { toggleFavorite } from "./toggleFavorite";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FavoritesButton({
   bookId,
   isFav,
}: {
   bookId: string;
   isFav: boolean;
}) {
   const t = useTranslations("book");
   const [isFavorite, setIsFavorite] = useState(isFav);
   const [isPending, setIsPending] = useState(false);
   const handlerFavorite = async () => {
      setIsPending(true);
      try {
         const result = await toggleFavorite({ bookId });
         if (result.success) {
            setIsFavorite(result.status === "ADD");
         } else {
            window.alert(t("favoriteError"));
         }
      } catch (error) {
         console.error("Failed to toggle favorite", error);
         window.alert(t("favoriteError"));
      } finally {
         setIsPending(false);
      }
   };

   return (
      <button
         type="button"
         aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")}
         title={isFavorite ? t("removeFavorite") : t("addFavorite")}
         aria-busy={isPending}
         disabled={isPending}
         onClick={() => {
         handlerFavorite();
      }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 text-lg shadow-md transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] disabled:opacity-50"
      >
      {isFavorite ? "❤️" : "🤍"}
      </button>
   );
}
