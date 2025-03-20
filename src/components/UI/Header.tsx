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

  const availableCategories = useSelector(
    (state: RootState) => state.categories.availableCategories
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

      Object.keys(groupedCategories).forEach((type) => {
        groupedCategories[type] = groupedCategories[type].filter((cat) =>
          availableCategories.includes(cat.slug)
        );
        if (groupedCategories[type].length === 0) {
          delete groupedCategories[type];
        }
      });

      setCategories(groupedCategories);
    };

    fetchCategoriesData();
  }, [availableCategories]);

  const handleCategoryClick = (slug: string | null) => {
    if (slug === null) {
      dispatch(resetCategory());
    } else {
      dispatch(setCategory(slug));
    }
  };

  return (
    <header className="bg-gradient-to-r from-primary via-secondary to-highlight text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="container flex items-center justify-between flex-wrap gap-x-8 gap-y-2 px-6">
        <nav className="flex items-center justify-center gap-x-4 gap-y-2 flex-wrap">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`px-4 py-2 rounded-lg font-bold transition text-lg tracking-wide
              ${
                activeCategory === null
                  ? "bg-accent text-black shadow-lg"
                  : "bg-primary hover:bg-warning shadow-md"
              }`}
          >
            🎮 All Games
          </button>

          {Object.entries(categories).map(([type, categoryList]) => {
            const isActive = categoryList.some(
              (cat) => cat.slug === activeCategory
            );
            return (
              <DropdownMenu
                key={type}
                label={type.replace(/([A-Z])/g, " $1")}
                isActive={isActive}
              >
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
                      className={`w-full block text-left px-4 py-2 font-semibold 
                                transition duration-300 rounded-md text-accent
                                hover:bg-primary hover:text-white ${
                                  activeCategory === cat.slug
                                    ? "bg-success text-black"
                                    : ""
                                }`}
                    >
                      {title}
                    </button>
                  );
                })}
              </DropdownMenu>
            );
          })}
        </nav>

        <div className="flex mx-auto lg:justify-end lg:mx-0 items-center">
          <span className="mr-4 font-bold text-accent">
            {userData.username} 🐵
          </span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-danger text-white font-bold rounded-lg shadow-lg 
                       hover:bg-warning transition-transform transform hover:scale-105"
          >
            Logout 🚀
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
