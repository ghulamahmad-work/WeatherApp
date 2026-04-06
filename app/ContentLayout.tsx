"use client";

import "./globals.css";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-full flex flex-col bg-[#979797]">
      <div className={`transition-opacity duration-500 delay-300 ${showSplash ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
    </div>
  );
}