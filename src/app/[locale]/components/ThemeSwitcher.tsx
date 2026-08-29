'use client'

import { useTheme } from "next-themes"
import {authClient} from "@/src/lib/auth-client"
import {useEffect } from "react"

export default function ThemeSwitcher({isAction}:{isAction:Boolean}){
   const {setTheme, theme} = useTheme()
   const nextTheme = theme==="dark"?"light":"dark"
   const { data: session } = authClient.useSession() 
   useEffect(()=>{
      if(session){
         const userTheme = session?.user?.theme || "system"
         setTheme(userTheme)
      }
      
   },[session])
   if(!isAction){
      return null
   }
   if(!session){
      return(
         <div onClick={()=>{setTheme(nextTheme)}} className="bg-white dark:bg-zinc-800  shadow-inner shadow-gray-400 relative rounded-full  w-16 h-6 rounded-full p-2 m-5" >
            <div  className={`bg-gray-500 dark:bg-gray-300 rounded-full w-5 h-5 absolute ${theme==="light"?"left-1":"right-1"} top-1/2 -translate-y-1/2 shadow-inner shadow-zinc-500`}></div>
         </div>
      )
   }
}