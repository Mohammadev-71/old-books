import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../lib/prisma";


export const auth = betterAuth({
   database:prismaAdapter(prisma,{
      provider:"postgresql"
   }),
   emailAndPassword:{
      enabled:true,
      requireEmailVerification:false,
   },
   user: {
      additionalFields: {
         language: {
            type: "string",
            defaultValue: "en",
            required: false,
         },
         theme: {
            type: "string",
            defaultValue: "light",
            required: false,
         }
      }
   },
})