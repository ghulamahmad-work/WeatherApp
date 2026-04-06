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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-start pt-24 bg-[#979797] transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="absolute top-48 text-white/70 text-5xl tracking-widest uppercase animate-slide-from-right">
        WEATHER APP BY
      </p>
      <div className="animate-slide-from-left mt-20">
        <Image
          src="/devnodes.webp"
          alt="Devnodes"
          width={780}
          height={80}
          priority
        />
      </div>


    </div>
  );
}