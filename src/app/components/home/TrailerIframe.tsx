interface TrailerIframeProp {
  videoKey: string;
}

export default function TrailerIframe({videoKey}: TrailerIframeProp) {
  return (
    <div className="relative w-full aspect-video">
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0 outline-none focus-visible:outline-none"
        src={`https://www.youtube.com/embed/${videoKey}?modestbranding=1&rel=0&showinfo=0&autoplay=0&mute=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        title="Trailer"
      />
    </div>
  );
}