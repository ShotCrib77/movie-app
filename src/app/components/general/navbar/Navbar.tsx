import Navigation from "./Navigation"

export default function Navbar() {
  return (
  <header className="flex justify-around items-center bg-nav h-20">
      <h1 className="text-xl md:text-2xl lg:text-3xl ml-16">TrackFlix</h1>
      <Navigation />
    </header>
  );
}