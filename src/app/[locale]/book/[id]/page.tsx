import prisma from "@/src/lib/prisma"
import { getTranslations } from "next-intl/server"

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



   return (
      <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-end ">

         {/* book img: */}
         <img src="https://m.media-amazon.com/images/I/61bfj+-wArL._SY466_.jpg" alt={book?.title} />


         {/* book details container: */}
         <div>
            <h1> <span>{t("title")}</span> {book?.title||'----'}</h1>
            <h1> <span>{t("description")}</span>  {book?.description||'----'}</h1>
            <h1> <span>{t("location")}</span>  {book?.location||'----'}</h1>
            <div>
               <h1> <span>{t("authName")}</span> {book?.author?.name||'----'}</h1>
               <h1> <span>{t("authEmail")}</span>  {book?.author?.email||'----'}</h1>
               <h1> <span>{t("authPhone")}</span>  {book?.author?.phone||'----'}</h1>
            </div>
         </div>
      </div>   
   )
}