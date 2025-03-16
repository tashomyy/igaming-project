import formData from "../lib/formSampleData.json";

interface Validator {
  key: string;
  parameters?: { targetLength?: number }; // Ensure correct typing
  invalid_message: string;
}

interface Field {
  code: string;
  name: string;
  fieldType: string;
  dataType: string;
  required: boolean;
  step: number;
  validators?: Validator[];
}
