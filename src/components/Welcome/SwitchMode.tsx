interface SwitchProps {
  changeMode: () => void;
  description: string;
}
const SwitchMode = ({ changeMode, description }: SwitchProps) => {
  return (
    <button
      onClick={changeMode}
      className="mt-4 px-6 py-2 bg-primary 
                     hover:bg-[var(--color-warning)] text-white font-bold 
                     rounded-md shadow-md transition-transform transform 
                     hover:scale-105 font-caption"
    >
      {description}
    </button>
  );
};

export default SwitchMode;
