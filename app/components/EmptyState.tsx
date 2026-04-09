"use client";
import { MapPin } from "lucide-react";
interface EmptyStateProps {
  onRequestLocation: () => void;
}

export default function EmptyState({ onRequestLocation }: EmptyStateProps) {
  return (
    <div className="flex flex-col md:flex-row items-center flex-1 px-4 md:px-12 py-8 md:py-0">
      {/* Top/Left — Big Location Icon */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-40 h-40 md:w-50 md:h-50 rounded-full bg-black border flex items-center justify-center">
          <MapPin size={86} strokeWidth={1} className="text-white" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full max-w-xs md:w-0.5 md:h-48 bg-black/20 my-8 md:my-0 md:mx-6" />

      {/* Bottom/Right — Text + Button */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-3 w-full">
        <p className="w-full text-center md:text-left text-2xl md:text-3xl font-medium text-black leading-snug">
          Allow location access or search for a city to get started 
        </p>

        <p className="w-full text-center md:text-left text-base md:text-lg text-black mb-2">
          Your weather will appear here once a location is selected 
        </p>

        <button
          onClick={onRequestLocation}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/80 cursor-pointer transition-colors mt-2"
        >
          <MapPin size={15} />
          Current location
        </button>
      </div>
    </div>
  );
}