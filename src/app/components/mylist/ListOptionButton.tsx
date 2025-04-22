interface ListOptionButtonProps {
  buttonType: "Watch Later" | "Have Watched";
  activeList: "Watch Later" | "Have Watched";
  changeActiveList: () => void;
}

export default function ListOptionButton({buttonType, activeList, changeActiveList}: ListOptionButtonProps) {
  return (
    <button
      className={`border border-b-0 p-2 rounded-t-md ${activeList === buttonType ? "scale-125 mb-1.5" : ""}`}
      onClick={changeActiveList}>
      {buttonType}
    </button>
  )
}
