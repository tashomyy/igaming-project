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
        className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-between items-center"
      >
        {label} <ChevronDownIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 w-max bg-gray-800 shadow-lg rounded-lg mt-2 z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
