import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider} from "next-intl";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/navbar";
import { getMessages } from "next-intl/server";
export const metadata: Metadata = {
  title: "Old Books",
  description: "Discover, share, and find a new home for beloved books.",
};

export default async function RootLayout({
  children,params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  const messages = await getMessages();


  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
