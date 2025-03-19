import { useEffect, useState } from "react";
import { Category, FormData } from "../../lib/types";
import { fetchCategories } from "../../services/categories";

interface HeaderProps {
  logout: () => void;
  userData: FormData | null;
}

const Header = ({ logout, userData }: HeaderProps) => {
  if (userData === null) return;

  const [categories, setCategories] = useState<Record<string, Category[]>>({});

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const res = await fetchCategories();

      const groupedCategories: Record<string, Category[]> = res.reduce(
        (acc: Record<string, Category[]>, category: Category) => {
          const type = category.type || "other";
          if (!acc[type]) acc[type] = [];
          acc[type].push(category);
          return acc;
        },
        {}
      );
      setCategories(groupedCategories);
    };

    fetchCategoriesData();
  }, []);

  const onCategorySelect = (slug: string) => {
    console.log(slug);
  };

  return (
    <header>
      <nav className="container mx-auto">
        {Object.entries(categories).map(([type, categoryList]) => (
          <div key={type} className="mb-4">
            <h2 className="text-lg font-semibold capitalize mb-2">
              {type.replace(/([A-Z])/g, " $1")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categoryList.map((cat) => {
                const title =
                  cat.multilingual?.find((lang) => lang.language === "en")
                    ?.title ||
                  cat.title ||
                  cat.slug;
                return (
                  <button
                    key={cat.id || cat.slug}
                    onClick={() => onCategorySelect(cat.slug)}
                    className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                  >
                    {title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      {userData.username} <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
