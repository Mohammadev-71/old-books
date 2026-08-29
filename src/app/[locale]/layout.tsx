import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider} from "next-intl";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";
import { redirect } from "next/navigation";
import {auth} from "@/src/utils/auth";
import { headers } from "next/headers";
import { getMessages } from "next-intl/server";
import ThemeSwitcher from "./components/ThemeSwitcher";
import LanguageSwitcher from "./components/LanguageSwitcher";
export const metadata: Metadata = {
  title: "books",
  description: "sale you old book",
};

export default async function RootLayout({
  children,params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {


const { locale } = await params; 

const session = await auth.api.getSession({
    headers: await headers(),
  });


  const messages = await getMessages();


  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"} suppressHydrationWarning>
      <body className="w-screen min-h-screen ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <LanguageSwitcher isAction={false}/>
            <ThemeSwitcher isAction={false}/>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
