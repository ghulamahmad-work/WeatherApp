"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function NavBar() {
  const [unit, setUnit] = useState<"C" | "F">("C");

  return (
<nav className="w-full border-b border-[#2c2c2c] bg-[#080808] px-7 py-2.5 flex items-center justify-between gap-4">      
      <div className="flex items-center gap-2 min-w-fit">
        <Image
          src="/devnodes.webp"
          alt="Devnodes"
          width={120}
          height={40}
          style={{ height: "64px", width: "auto" }}
          priority
        />
      </div>

      <div className="flex-1 max-w-md flex items-center gap-2 bg-[#979797] border-gray-200 rounded-lg px-3.5 py-2.5">
    <Search size={24} color= "#FFFFFF" />
<input
  type="text"
  placeholder="Search any city or location"
  autoFocus
  className="bg-transparent text-md text-white placeholder:text-white outline-none w-full"
/>
      </div>

      <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 min-w-fit">
        <button
          onClick={() => setUnit("C")}
          className={`px-3 py-1.5 rounded-md text-sm cursor-pointer font-medium transition-all ${
            unit === "C"
              ? "bg-white text-black"
              : "text-white hover:text-gray-300"
          }`}
        >
          °C
        </button>
        <button
          onClick={() => setUnit("F")}
          className={`px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-all ${
            unit === "F"
              ? "bg-white text-black"
              : "text-white hover:text-gray-300"
          }`}
        >
          °F
        </button>
      </div>

    </nav>
  );
}