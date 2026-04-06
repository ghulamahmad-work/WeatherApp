"use client";
import NavBar from "./components/NavBar";
import EmptyState from "./components/EmptyState";
export default function Home() {
  return (
<div className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center justify-center flex-1 w-full text-center">
  <NavBar />
<EmptyState onRequestLocation={() => {
  // geolocation logic comes here later
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords);
  });
}} />
      </main>
    </div>
  );
}
