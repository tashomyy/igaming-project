import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import { FormData } from "../../lib/types";

const Layout = () => {
  const [userData, setUserData] = useState<FormData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData) as FormData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUserData(null);
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header userData={userData} logout={logout} />
      <nav>Navigation Bar</nav>
      <main className="h-full">
        <Outlet />
      </main>
      <footer className="mt-auto">My App Footer</footer>
    </div>
  );
};

export default Layout;
