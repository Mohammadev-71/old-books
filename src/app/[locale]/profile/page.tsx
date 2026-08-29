import { auth } from "@/src/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import prisma from "@/src/lib/prisma";
export default async function ProfilePage() {

   
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session?.user) {
      redirect("/login");
   }


   const userData = await prisma.user.findUnique({
      where:{id:session?.user?.id},
      include:{
         favBooks:{
            select:{
               id:true
            }
         },
         books:{
            select:{
               id:true
            }
         }
      }
   })

   return <ProfileForm initialUser={userData} />;
}