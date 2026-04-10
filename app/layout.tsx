import type { Metadata } from "next";
import ContentLayout from "./ContentLayout";
import QueryProvider from "./providers/QueryProvider";
import { WeatherProvider } from "./context/WeatherContext";

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
          <WeatherProvider>
            <ContentLayout>{children}</ContentLayout>
          </WeatherProvider>
        </QueryProvider>
      </body>
    </html>
  );
}