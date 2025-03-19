import { useState } from "react";
import LoginForm from "../components/Welcome/LoginForm";
import RegisterForm from "../components/Welcome/RegisterForm";
import SwitchMode from "../components/Welcome/SwitchMode";
import { AuthModes } from "../lib/enums";

const Welcome = () => {
  const [formDisplay, setFormDisplay] = useState<AuthModes>(AuthModes.REGISTER);

  const isLogin = formDisplay === AuthModes.LOGIN;
  const description = isLogin ? "Go to Register 🚀" : "Go to Login 🔥";

  const toggleMode = () =>
    setFormDisplay((prevMode) =>
      prevMode === AuthModes.LOGIN ? AuthModes.REGISTER : AuthModes.LOGIN
    );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center 
                    bg-bg-main text-text-primary"
    >
      <div
        className="bg-bg-card p-8 rounded-lg shadow-xl 
                      border-4 border-primary hover:border-highlight 
                      transition-all duration-300 container text-center"
      >
        <h1
          className="text-4xl font-bold text-[var(--color-accent)] 
                       font-heading tracking-wider"
        >
          {isLogin ? "Welcome Back! 🐵" : "Join Us! 🎮"}
        </h1>

        <div className="mt-6">{isLogin ? <LoginForm /> : <RegisterForm />}</div>

        <SwitchMode description={description} changeMode={toggleMode} />
      </div>
    </div>
  );
};

export default Welcome;
