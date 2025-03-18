import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formData from "../../lib/formSampleData.json";
import FormField from "../UI/FormField";
import { InputType } from "../../lib/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, step2Schema } from "./validation";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };
  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    console.log("Final Form Data:", finalData);
    // submit
  };

  return (
    <div className="max-w-lg mx-auto">
      {step === 1 ? (
        <StepOneForm onNext={handleNext} storedData={formData} />
      ) : (
        <StepTwoForm
          onBack={() => handleBack()}
          onSubmit={handleSubmit}
          storedData={formData}
          saveData={(data) => setFormData((prev) => ({ ...prev, ...data }))}
        />
      )}
    </div>
  );
};

export default RegistrationForm;

const StepOneForm = ({
  onNext,
  storedData,
}: {
  onNext: (data: any) => void;
  storedData: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(step1Schema),
    defaultValues: storedData,
  });

  const fieldsForStepOne = formData.fields.filter((field) => field.step === 1);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 p-4">
      {fieldsForStepOne.map((field) => (
        <FormField
          key={field.code}
          code={field.code}
          type={field.fieldType as InputType}
          label={field.name}
          name={field.code}
          error={errors[field.code]}
          register={register}
          {...(field.valueList && { options: field.valueList })}
        />
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Next
      </button>
    </form>
  );
};

const StepTwoForm = ({
  onBack,
  onSubmit,
  storedData,
  saveData,
}: {
  onBack: () => void;
  onSubmit: (data: any) => void;
  storedData: any;
  saveData: (data: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(step2Schema),
    defaultValues: storedData,
  });

  const fieldsForStepTwo = formData.fields.filter((field) => field.step === 2);

  const handleBack = () => {
    const newData = getValues();
    saveData(newData);
    onBack();
  };

  useEffect(() => {
    console.log("Updated storedData for Step 2:", storedData);

    reset(storedData);
  }, [storedData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4">
      {fieldsForStepTwo.map((field) => (
        <FormField
          key={field.code}
          code={field.code}
          type={field.fieldType as InputType}
          label={field.name}
          name={field.code}
          error={errors[field.code]}
          register={register}
          {...(field.valueList && { options: field.valueList })}
        />
      ))}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
