'use server'


import { auth } from "@/src/utils/auth"
import prisma from "@/src/lib/prisma"
import { headers } from "next/headers" 
import { redirect } from "next/navigation";
import { bookSchema } from "@/src/utils/schemas/bookSchema";



interface bookInterface{
   title:string;
   description:string;
   location:string
}


export async function shareBookHandler({book}:{book:bookInterface}){
   
   
   const session = await auth.api.getSession({
      headers: await headers()
   })



   if(session && session.user.id){
      
      try {

         const result = bookSchema.safeParse(book)

         if(!result.success){
            const errors = result.error.flatten().fieldErrors
            return { success: false, errors:errors }
         }

         const { title, description, location } = result.data

         await prisma.book.create({
            data:{
               title:title,
               description:description,
               location:location,
               authorId:session?.user?.id,
            }
         })
         return({success:true,msg:"book shared successfully"})
      } catch (error) {
         console.log(error)
         return({success:false,errors:error})
      }
      
   }else{
      redirect("/login")
   }

}