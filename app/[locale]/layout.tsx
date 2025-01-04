import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Wrapper from "../wrapper";
import { LangProvider } from "@/providers/LangProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Account Stats",
  description: "Manager your expenses and income.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <LangProvider params={params}>
          <Wrapper>{children}</Wrapper>
        </LangProvider>
      </body>
    </html>
  );
}
