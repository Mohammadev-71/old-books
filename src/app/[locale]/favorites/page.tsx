import BookCard from "../components/BookCard";
import { headers } from "next/headers";
import { auth } from "@/src/utils/auth";
import prisma from "@/src/lib/prisma";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function Favorites() {
   const session = await auth.api.getSession({
      headers: await headers(),
   })

   if(!session){
      redirect("/login")
   }


   const userId = session?.user?.id
   const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
         favBooks: {
            include: {
               favoritedBy: {
                  select: {
                     id: true,
                  }
               }
            }
         }
      },
   });


   return(
      <div className="min-w-screen min-h-screen flex flex-wrap pt-4 justify-center items-center gap-8">
         {
            user?.favBooks.map((fav)=>(
               <BookCard book={fav}/>
            ))
         }
      </div>
   )
}
