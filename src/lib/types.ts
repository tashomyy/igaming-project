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

export type Game = {
  id: number;
  demoMode: boolean;
  type: string;
  category: string;
  subCategory: string;
  extraCategories: string;
  rtp: number;
  desktopEnabled: boolean;
  desktopID: number;
  desktopDescription: string;
  provider: string;
  vendor: string;
  portal: string;
  created_at: string;
  desktopSlug: string;
  name: string;
  resolution: string;
  tags: string;
  multilingual: Multilingual[];
  geoFilter: { id: number };
  desktopThumbnail: { url: string };
};

export type Category = {
  id: number;
  slug: string;
  portal: string;
  multilingual: Multilingual[];
  publishing: Publishing;
  type: "category" | "subCategory" | "tags" | "type" | "extraCategories";
  title?: string;
};

export type Multilingual = {
  id: number;
  language: string;
  title: string;
  description?: string;
};

export type Publishing = {
  id: number;
  publishDate: string;
  status: string;
};
