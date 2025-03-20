import { useNavigate } from "react-router-dom";
import FormField from "../UI/FormField";
import { InputType } from "../../lib/enums";
import { LoginFormData, loginSchema } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: LoginFormData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (user: { email: string; password: string }) =>
        user.email === data.email && user.password === data.password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-8 p-4">
        <FormField
          code="email"
          type={InputType.String}
          label="Email"
          name="email"
          error={errors.email?.message}
          register={register}
        />

        <FormField
          code="password"
          type={InputType.Password}
          label="Password"
          name="password"
          error={errors.password?.message}
          register={register}
        />

        <button
          type="submit"
          className="px-5 py-2 bg-primary text-text-primary
               rounded-lg shadow-lg font-bold tracking-wide font-caption
               hover:bg-highlight hover:scale-105 transition-transform duration-300"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
