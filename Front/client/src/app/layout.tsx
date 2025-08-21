import MainProvider from "@/components/providers/MainProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className="notranslate" suppressHydrationWarning>
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}