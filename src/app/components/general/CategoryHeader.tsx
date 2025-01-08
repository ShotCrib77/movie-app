interface CategoryHeaderProp {
  categoryName: string;
}

export default function CategoryHeader({categoryName}: CategoryHeaderProp) {
  return (
    <h2 className="font-bold text-xl md:text-2xl lg:text-3xl m-auto mb-2 whitespace-normal box-border w-4/6 text-center">{categoryName}</h2>
  )
}