import { XMarkIcon } from "@heroicons/react/24/solid";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton = ({ onReset }: ResetButtonProps) => {
  const opacityBehavior = "opacity-100 md:opacity-0 md:group-hover:opacity-100";

  return (
    <button
      type="button"
      onClick={onReset}
      className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-text/50 hover:text-red-500 transition-opacity  cursor-pointer z-10 ${opacityBehavior}`}
    >
      <XMarkIcon className="stroke-current h-4 w-4" />
    </button>
  );
};

export default ResetButton;
