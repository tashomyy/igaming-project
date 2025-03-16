import { useState } from "react";
import { useForm } from "react-hook-form";
import formData from "../../lib/formSampleData.json";
import FormField from "../UI/FormField";
import { InputType } from "../../lib/enums";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const fieldsForStep = formData.fields.filter((field) => field.step === step);

  const onSubmit = (data: any) => {
    if (step === 1) return;
    setStep(2);
    console.log("Final Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      {fieldsForStep.map((field) => (
        <FormField
          key={field.code}
          code={field.code}
          type={field.fieldType as InputType}
          label={field.name}
          name={field.name}
          errors={errors[field.code]}
          register={register}
          {...(field.valueList && { options: field.valueList })}
        />
      ))}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {step === 2 ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
