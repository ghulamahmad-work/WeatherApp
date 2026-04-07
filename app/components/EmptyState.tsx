"use client";
import { MapPin } from "lucide-react";
interface EmptyStateProps {
  onRequestLocation: () => void;
}

export default function EmptyState({ onRequestLocation }: EmptyStateProps) {
  return (
<div className="flex items-center flex-1 px-12">
      {/* Left — Big Location Icon */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-50 h-50 rounded-full bg-black border  flex items-center justify-center">
          <MapPin size={86} strokeWidth={1} className="text-white" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-0.5 h-48 bg-black mx-6" />

      {/* Right — Text + Button */}
   <div className="flex-1 flex flex-col items-start gap-3 w-full">
  <p className="w-full text-left text-3xl font-medium text-black leading-snug">
    Allow location access or search for a city to get started 
  </p>

  <p className="w-full text-left text-lg text-black mb-2">
    Your weather will appear here once a location is selected 
  </p>

  <button
    onClick={onRequestLocation}
    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-black/80 cursor-pointer transition-colors"
  >
    <MapPin size={15} />
    Current location
  </button>
</div>

    </div>
  );
}