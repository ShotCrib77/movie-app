import ListItem from "./ListItem";

interface ListItemsContainerProp {
  haveWatched: boolean;
}

export default function ListItemsContainer({haveWatched}: ListItemsContainerProp) {
  return (
    <section className="w-full flex flex-col items-center gap-4 justify-center">
      <ListItem movieName={"The one who pulls out the swords is crowned king"} movieYear={2001} haveWatched={haveWatched} />
      <ListItem movieName={"Prison Break"} movieYear={2011} haveWatched={haveWatched} />
      <ListItem movieName={"Dexter"} movieYear={2003} haveWatched={haveWatched} />
      <ListItem movieName={"The One"} movieYear={2024} haveWatched={haveWatched} />
      <ListItem movieName={"Space Monkeys"} movieYear={2001} haveWatched={haveWatched} />
      <ListItem movieName={"8Ball"} movieYear={2009} haveWatched={haveWatched} />
    </section>
  );
}