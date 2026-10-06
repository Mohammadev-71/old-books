'use server'


import { auth } from "@/src/utils/auth"
import prisma from "@/src/lib/prisma"
import { headers } from "next/headers" 
import { redirect } from "next/navigation";
import { bookSchema } from "@/src/utils/schemas/bookSchema";
import { revalidatePath } from "next/cache";

interface BookInput {
   title:string;
   description:string;
   location:string
}

type ShareBookResult =
   | { success: true }
   | { success: false; errors?: Record<string, string[]>; message?: string };

export async function shareBookHandler({book}:{book:BookInput}): Promise<ShareBookResult> {
   const session = await auth.api.getSession({
      headers: await headers()
   })

   if (!session?.user.id) {
      redirect("/login")
   }

   const result = bookSchema.safeParse(book)

   if (!result.success) {
      return { success: false, errors: result.error.flatten().fieldErrors }
   }

   try {
      await prisma.book.create({
         data: {
            ...result.data,
            authorId: session.user.id,
         }
      })
      revalidatePath("/[locale]", "page")
      revalidatePath("/[locale]/myBooks", "page")
      return { success: true }
   } catch (error) {
      console.error("Failed to share book", error)
      return { success: false, message: "Unable to share this book right now." }
   }
}