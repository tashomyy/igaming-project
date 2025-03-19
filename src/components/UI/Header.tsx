import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category, FormData } from "../../lib/types";
import { fetchCategories } from "../../services/categories";
import { setCategory, resetCategory } from "../../store/slices/categories";
import { RootState } from "../../store/store";
import DropdownMenu from "./DropdownMenu";

interface HeaderProps {
  logout: () => void;
  userData: FormData | null;
}

const Header = ({ logout, userData }: HeaderProps) => {
  if (!userData) return null;

  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state: RootState) => state.categories.activeCategory
  );

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

  const handleCategoryClick = (slug: string | null) => {
    if (slug === null) {
      dispatch(resetCategory());
    } else {
      dispatch(setCategory(slug));
    }
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-lg  sticky top-0 z-50 ">
      <div className="container flex items-center justify-between flex-wrap gap-x-8 gap-y-2">
        <nav className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-lg transition ${
              activeCategory === null
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
                      activeCategory === cat.slug ? "bg-blue-600" : ""
                    }`}
                  >
                    {title}
                  </button>
                );
              })}
            </DropdownMenu>
          ))}
        </nav>

        <div className="flex mx-auto lg:justify-end lg:mx-0 items-center">
          <span className="mr-4">{userData.username}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
