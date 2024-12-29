interface ImagePlaceholderProp {
  size: "sm" | "md" | "lg" | "xl"
}

export default function ImagePlaceholder({size} : ImagePlaceholderProp) {
  return (
    <section className={`bg-slate-300 flex justify-center items-center text-black
      ${size === "sm" ? "w-32 h-32" :
        size === "md" ? "w-48 h-48" :
        size === "lg" ? "w-52 h-52" :
        size === "xl" ? "w-64 h-64" :
        "invalid"}
    `}>
      Placeholder
    </section>
  );
}