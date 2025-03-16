import { InputType } from "./enums";

export const inputToValue: Record<InputType, string> = {
  [InputType.String]: "text",
  [InputType.Dropdown]: "select",
  [InputType.Password]: "password",
  [InputType.Date]: "date",
};
