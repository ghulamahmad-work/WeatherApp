import type { Metadata } from "next";
import ContentLayout from "./ContentLayout";
import QueryProvider from "./providers/QueryProvider";

export const metadata: Metadata = {
  title: "Dev-Weather",
  description: "Weather app built by Devnodes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <ContentLayout>{children}</ContentLayout>
        </QueryProvider>
      </body>
    </html>
  );
}