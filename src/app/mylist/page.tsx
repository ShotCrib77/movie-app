import ListItemsContainer from "../components/mylist/ListItemsContainer";
import ListOptions from "../components/mylist/ListOption";

export default function Mylist() {
  return (
    <section className="flex flex-col justify-center items-center py-24">
      <ListOptions />
      <ListItemsContainer />
    </section>
  );
}