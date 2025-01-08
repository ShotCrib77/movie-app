interface InfoHeaderProp {
  info: string;
}

export default function InfoHeader({info, }: InfoHeaderProp) {
  return(
    <h2 className="text-lg whitespace-nowrap">{info}</h2>
  );
}