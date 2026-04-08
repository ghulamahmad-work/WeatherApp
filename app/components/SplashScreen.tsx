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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-[#979797] transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="text-white/70 text-2xl sm:text-4xl md:text-5xl tracking-widest uppercase animate-slide-from-right text-center px-4">
        WEATHER APP BY
      </p>

      <div className="animate-slide-from-left w-[280px] sm:w-[480px] md:w-[640px] lg:w-[780px]">
        <Image
          src="/devnodes.webp"
          alt="Devnodes"
          width={780}
          height={80}
          priority
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}