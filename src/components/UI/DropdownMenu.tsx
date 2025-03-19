import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef, ReactNode } from "react";

interface DropdownMenuProps {
  label: string;
  children: ReactNode;
}

const DropdownMenu = ({ label, children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-max" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-2 bg-primary hover:bg-warning rounded-lg 
                   flex justify-between items-center text-white font-bold
                   border-2 border-transparent hover:border-accent 
                   transition-all duration-300 transform hover:scale-105"
      >
        {label}
        <ChevronDownIcon
          className={`w-5 h-5 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 w-max bg-secondary shadow-2xl 
                        rounded-lg mt-2 z-20 p-3 border-2 border-accent"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
