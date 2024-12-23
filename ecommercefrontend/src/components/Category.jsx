import { categories } from "../dummyData";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <div className="flex flex-wrap gap-3 p-5 justify-center sm:p-0 ">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Categories;
