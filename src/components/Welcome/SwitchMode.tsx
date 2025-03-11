import React from "react";

interface SwitchProps {
  changeMode: () => void;
  description: string;
}
const SwitchMode = ({ changeMode, description }: SwitchProps) => {
  return (
    <button className="cursor-pointer" onClick={changeMode}>
      {description}
    </button>
  );
};

export default SwitchMode;
