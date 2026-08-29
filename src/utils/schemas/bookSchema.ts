import {z} from 'zod'


export const bookSchema = z.object({
   title:z.string({message:"title must be a string"})
   .min(1,{message:"title can't be empty"})
   .max(50,{message:"title can't be more than 50 char"}),

   description:z.string({message:"description must be a string"})
   .min(1,{message:"description can't be empty"})
   .max(500,{message:"description can't be more than 500 char"}),

   location:z.string({message:'location must be a string'})
   .min(1,{message:"location can't be empty"})
   .max(500,{message:"location can't be more than 500 char"}),
})



export type BookFormData = z.infer<typeof bookSchema>