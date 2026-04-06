import type { Metadata } from "next";
import ContentLayout from "./ContentLayout";

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
        <ContentLayout>{children}</ContentLayout>
      </body>
    </html>
  );
}