'use server'

import { auth } from "@/src/utils/auth"
import { headers } from "next/headers"
import prisma from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function toggleFavorite({bookId}:{bookId:string}){

   // get user data from the session:
   const session = await auth.api.getSession({
      headers: await headers()

   })

   // get user id :
   const userId = session?.user?.id

   // check if user logged in :
   if(!userId){
      redirect("/login")
   }




   const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favBooks: true },
   });


   // get the favorites books list 
   const isFavorite = user?.favBooks.some((book) => book.id === bookId);
   // if the book not in list add it:
   if (!isFavorite) {
      try {
         await prisma.user.update({
            where: { id: userId },
            data: {
            favBooks:{ connect: { id: bookId } },
            },
         });
         revalidatePath("/")
         return ({success:true, status:"ADD",FavList:user})
      } catch (error) {
         console.log(error)
         return ({success:false, msg:error})
      }
      
   // if the book in list remove it:
   }else {
      try {
         await prisma.user.update({
            where: { id: userId },
            data: {
            favBooks:{ disconnect: { id: bookId } }
            },
         });
         revalidatePath("/")
         return ({success:true, status:"REMOVE",FavList:user})
      } catch (error) {
         console.log(error)
         return ({success:false, msg:error})
      }
      
   }
}
