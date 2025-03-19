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
  const inputClass = `
    sm:min-w-[400px] w-full bg-secondary 
    placeholder:text-text-muted text-text-primary
    text-xs sm:text-sm border border-success
    rounded-md px-3 py-2 transition-all duration-300 ease-in-out 
    focus:outline-none focus:border-accent 
    hover:border-highlight shadow-md focus:shadow-lg
    pr-8 ${error ? "border-2 !border-danger" : ""}
  `;

  const renderInput = () => {
    switch (type) {
      case InputType.String:
      case InputType.Password:
      case InputType.Date:
        return (
          <div className="relative w-full group">
            <label htmlFor="name" className="text-primary">
              {label}
            </label>
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
            <label htmlFor="name" className="text-primary">
              {label}
            </label>
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

            <span
              className="absolute right-2 top-9 
                            text-text-muted transition-opacity pointer-events-none"
            >
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
      {renderInput()}
      {error !== undefined && (
        <p className="text-sm text-[var(--color-danger)] font-semibold">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
