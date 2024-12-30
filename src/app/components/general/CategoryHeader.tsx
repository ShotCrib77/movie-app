interface CategoryHeaderProp {
  categoryName: string;
}

export default function CategoryHeader({categoryName}: CategoryHeaderProp) {
  return (
    <h2 className="font-bold text-3xl m-auto mb-2">{categoryName}</h2>
  )
}