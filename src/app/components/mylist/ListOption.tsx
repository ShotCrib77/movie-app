import { useEffect } from "react";

interface ListOptionsProps {
  activeList: "Watch Later" | "Have Watched";
  changeActiveList: (newList: "Watch Later" | "Have Watched") => void;
}

export default function ListOptions({ activeList, changeActiveList }: ListOptionsProps) {
  // Load the saved list from localStorage when the component mounts
  useEffect(() => {
    const savedList = localStorage.getItem("activeList") as "Watch Later" | "Have Watched" | null;
    if (savedList && savedList !== activeList) {
      changeActiveList(savedList);
    }
  }, []); // Only run on mount

  // Save the selected list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeList", activeList);
  }, [activeList]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeActiveList(e.target.value as "Watch Later" | "Have Watched");
  };

  return (
    <section className="flex w-10/12 mx-auto items-center gap-6 border-b justify-end mb-4">
      <select
        id="listSelect"
        value={activeList}
        onChange={handleChange}
        className="p-1 md:p-2 lg:p-3 mb-2 border rounded-md bg-slate-800"
      >
        <option value="Have Watched">Have Watched</option>
        <option value="Watch Later">Watch Later</option>
      </select>
    </section>
  );
}