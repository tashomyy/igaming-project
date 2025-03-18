import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import formData from "../../lib/formSampleData.json";
import FormField from "../UI/FormField";
import { InputType } from "../../lib/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Step1FormData,
  step1Schema,
  Step2FormData,
  step2Schema,
} from "./validation";
import { FORM_STEPS } from "../../lib/constants";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStepSwitch = (data: any, step: number) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(step);
  };

  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    console.log("Final Form Data:", finalData);
    // submit
  };

  return (
    <div className="max-w-lg mx-auto">
      {step === FORM_STEPS.STEP_ONE ? (
        <StepOneForm onNext={handleStepSwitch} storedData={formData} />
      ) : (
        <StepTwoForm
          onBack={handleStepSwitch}
          onSubmit={handleSubmit}
          storedData={formData}
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
  onNext: (data: any, step: number) => void;
  storedData: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1FormData>({
    mode: "onBlur",
    resolver: zodResolver(step1Schema),
    defaultValues: storedData,
  });

  const fieldsForStepOne = formData.fields.filter(
    (field) => field.step === FORM_STEPS.STEP_ONE
  );

  return (
    <form
      onSubmit={handleSubmit((data) => onNext(data, FORM_STEPS.STEP_TWO))}
      className="space-y-8 p-4"
    >
      {fieldsForStepOne.map((field) => (
        <FormField
          key={field.code}
          code={field.code}
          type={field.fieldType as InputType}
          label={field.name}
          name={field.code}
          error={errors[field.code as keyof Step1FormData]?.message}
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
}: {
  onBack: (data: any, step: number) => void;
  onSubmit: (data: any) => void;
  storedData: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm<Step2FormData>({
    mode: "onBlur",
    resolver: zodResolver(step2Schema),
    defaultValues: storedData,
  });

  const fieldsForStepTwo = formData.fields.filter((field) => field.step === 2);

  const handleBack = () => {
    const newData = getValues();
    onBack(newData, FORM_STEPS.STEP_ONE);
  };

  useEffect(() => {
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
          error={errors[field.code as keyof Step2FormData]?.message}
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
