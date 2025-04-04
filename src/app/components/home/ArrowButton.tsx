interface ArrowButtonProps {
  direction: "left" | "right"| "down" | "up";
  scrollFunc?: VoidFunction;
}

export default function ArrowButton({direction, scrollFunc}: ArrowButtonProps) {
  return (
    <button
    onClick={scrollFunc}
    className={`absolute z-10 h-10 w-10 flex items-center justify-center rounded-full shadow hover:scale-110 transition ${direction === "left" ? "left-1" : direction === "right" ? "right-1": ""}`}
  >
    <i className={`border border-white border-r-2 border-b-2 border-l-0 border-t-0 inline-block p-1 ${direction === "left" ? "left" : direction === "right" ? "right" : direction === "down" ? "down" : "up"}`}></i>
  </button>
  );
}