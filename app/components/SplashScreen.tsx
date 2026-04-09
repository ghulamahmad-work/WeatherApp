"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 600);
    }, 4700);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#979797] transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Text slides in from right, sits just above the image */}
      <p className="text-white/70 text-2xl sm:text-4xl md:text-5xl tracking-widest uppercase animate-slide-from-right text-center px-4 mb-4.5 sm:mb-3.5 md:mb-4.5 relative z-10">
        WEATHER APP BY
      </p>

      {/* Image slides in from left, slightly behind the text */}
      <div className="animate-slide-from-left w-65 sm:w-110 md:w-150 lg:w-180 relative z-0">
        <Image
          src="/devnodes.webp"
          alt="Devnodes"
          width={720}
          height={80}
          priority
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}