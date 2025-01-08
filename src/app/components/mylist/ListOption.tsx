import { List } from "postcss/lib/list";
import ListOptionButton from "./ListOptionButton";

interface ListOptionsProps {
  activeList: "Watch Later" | "Have Watched";
  changeActiveList: () => void;
}

export default function ListOptions({activeList, changeActiveList}: ListOptionsProps) {
  return (
    <section className="flex w-4/6 ml-4 items-center gap-6">
      <ListOptionButton buttonType="Have Watched" activeList={activeList} changeActiveList={changeActiveList} />

      <ListOptionButton buttonType="Watch Later" activeList={activeList} changeActiveList={changeActiveList} />
    </section>
  );
}