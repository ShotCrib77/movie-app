import Navigation from "./Navigation"

export default function Navbar() {
  return (
  <header className="flex justify-around items-center bg-nav h-20">
      <h1 className="text-2xl">WatchFlix</h1>
      <Navigation />
    </header>
  );
}