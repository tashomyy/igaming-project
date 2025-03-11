import { useState } from "react";
import LoginForm from "../components/Welcome/LoginForm";
import RegisterForm from "../components/Welcome/RegisterForm";
import SwitchMode from "../components/Welcome/SwitchMode";

enum AuthModes {
  LOGIN = "login",
  REGISTER = "register",
}

const Welcome = () => {
  const [formDisplay, setFormDisplay] = useState<AuthModes>(AuthModes.REGISTER);

  const isLogin = formDisplay === AuthModes.LOGIN;
  const description = isLogin
    ? "Do not have an account? Register now"
    : "Already have an account? Sign in";

  const toggleMode = () =>
    setFormDisplay((prevMode) =>
      prevMode === AuthModes.LOGIN ? AuthModes.REGISTER : AuthModes.LOGIN
    );

  return (
    <div className="tw-px bg-primary min-h-screen">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <SwitchMode description={description} changeMode={toggleMode} />
    </div>
  );
};

export default Welcome;
