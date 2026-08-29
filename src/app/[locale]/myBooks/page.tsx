import { auth } from "@/src/utils/auth";
import { headers } from "next/headers";
import prisma from "@/src/lib/prisma";
import BookCard from "../components/BookCard";



export default async function MyBooks(){
   const session = await auth.api.getSession({
      headers: await headers()
   })

   const userId = session?.user?.id
   const myBooks  =  await prisma.book.findMany({
      where:{
         authorId:userId
      }
   })


   return (
      <div className="min-w-screen min-h-screen flex flex-wrap pt-4">
         {
            myBooks.map((book)=>(
               <BookCard book={book}/>
            ))
         }
      </div>
      
   )
}