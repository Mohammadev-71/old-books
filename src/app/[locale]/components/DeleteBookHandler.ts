'use server'
import prisma from "@/src/lib/prisma"
import { auth } from "@/src/utils/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"


export default async function deleteBookHandler({bookId}:{bookId:string}){


   // get user data from the session:
   const session = await auth.api.getSession({
      headers: await headers()
   })


   // Check if user logged in if not return to login page:
   if(!session){
      redirect("/login")
   }


   // get the books list of the user:
   const userBooks =  await prisma.user.findUnique({
      where:{id:session?.user?.id},
      select:{
         books:{
            select:{
               id:true
            }
         }
      }
   })


   // check if the current book in the user book list:
   const isMyBook = userBooks?.books?.some(book => book.id === bookId)
   

   // return error message if the user not the owner of the book:
   if(!isMyBook){
      return({msg:"you are not the author of this book"})
   }

   // delete book handler and refresh the page to get the new list of books:
   try {
      await prisma.book.delete({
         where:{id:bookId}
      })
      revalidatePath("/myBooks")
      return ({success:true, msg:"Book Deleted Successfully"})
   } catch (error) {
      console.log(error)
      return { success: false, msg: "Failed to delete the book" }
      
   }  
}