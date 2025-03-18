import { UseFormRegister } from "react-hook-form";
import { InputType } from "./enums";
import {
  StepOneFormData,
  StepTwoFormData,
} from "../components/Welcome/validation";

export interface Field {
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

export type FormData = StepOneFormData & StepTwoFormData;
