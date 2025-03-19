import { useEffect, useState } from "react";
import { Category, FormData } from "../../lib/types";
import { fetchCategories } from "../../services/categories";
import DropdownMenu from "./DropdownMenu";

interface HeaderProps {
  logout: () => void;
  userData: FormData | null;
  onCategorySelect: (category: string | null) => void;
}

const Header = ({ logout, userData, onCategorySelect }: HeaderProps) => {
  if (userData === null) return null;

  const [categories, setCategories] = useState<Record<string, Category[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    onCategorySelect(slug);
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between">
      <nav className="flex items-center justify-center gap-x-4">
        <button
          onClick={() => handleCategoryClick(null)}
          className={` px-4 py-2 rounded-lg transition ${
            selectedCategory === null
              ? "bg-blue-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          All Games
        </button>

        {Object.entries(categories).map(([type, categoryList]) => (
          <DropdownMenu key={type} label={type.replace(/([A-Z])/g, " $1")}>
            {categoryList.map((cat) => {
              const title =
                cat.multilingual?.find((lang) => lang.language === "en")
                  ?.title ||
                cat.title ||
                cat.slug;
              return (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`w-full block text-left px-4 py-2 hover:bg-gray-700 transition ${
                    selectedCategory === cat.slug ? "bg-blue-600" : ""
                  }`}
                >
                  {title}
                </button>
              );
            })}
          </DropdownMenu>
        ))}
      </nav>

      <div className="flex justify-end items-center mt-4">
        <span className="mr-4">{userData.username}</span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
