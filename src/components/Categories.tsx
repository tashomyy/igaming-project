import { use } from "react";

interface Category {
  slug: string;
  title: string;
}

interface CategoriesProps {
  categoriesPromise: Promise<Category[]>;
}

const CategoriesComponent = ({ categoriesPromise }: CategoriesProps) => {
  const categories = use(categoriesPromise);
  return (
    <ul className="mx-auto w-max my-5">
      {categories.map((category) => (
        <li key={category.slug}>{category.title}</li>
      ))}
    </ul>
  );
};

export default CategoriesComponent;
