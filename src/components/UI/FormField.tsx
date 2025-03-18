import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ResetButton from "./ResetButton";
import { InputType } from "../../lib/enums";
import { inputToValue } from "../../lib/helpers";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps {
  code: string;
  label: string;
  name: string;
  type: InputType;
  options?: { value: string; name: string }[];
  placeholder?: string;
  className?: string;
  register: UseFormRegister<any>;
  onReset?: () => void;
  error: string | undefined;
}

const FormField = ({
  label,
  name,
  type,
  options,
  placeholder,
  onReset,
  className,
  register,
  error,
}: FormFieldProps) => {
  const inputClass = `w-full bg-transparent placeholder:text-[#333] dark:placeholder:text-white text-primary-text text-xs sm:text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow pr-8 ${
    error ? "border-red-500" : "border-border-color"
  }`;

  const renderInput = () => {
    switch (type) {
      case InputType.String:
      case InputType.Password:
      case InputType.Date:
        return (
          <div className="relative w-full group">
            <input
              type={inputToValue[type]}
              placeholder={placeholder}
              className={inputClass}
              {...register(name)}
            />
            {onReset && <ResetButton onReset={onReset} />}
          </div>
        );

      case InputType.Dropdown:
        return (
          <div className="relative w-full group">
            <select
              {...register(name)}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            {onReset && <ResetButton onReset={onReset} />}

            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 transition-opacity pointer-events-none">
              <ChevronDownIcon className="stroke-current w-4 h-4" />
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col gap-2 w-full max-w-md relative ${className}`}
    >
      <label className="text-primary-text font-medium">{label}</label>
      {renderInput()}
      {error !== undefined && <p className="text-sm text-red-500 ">{error}</p>}
    </div>
  );
};

export default FormField;
