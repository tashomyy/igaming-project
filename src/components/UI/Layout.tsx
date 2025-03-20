import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Suspense, useEffect, useState } from "react";
import { FormData } from "../../lib/types";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./Loader";

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
      <ErrorBoundary
        fallback={
          <div className="text-center text-red-500">Something went wrong</div>
        }
      >
        <Suspense fallback={<Loader />}>
          <Header userData={userData} logout={logout} />
        </Suspense>
      </ErrorBoundary>
      <main className="h-full">
        <Outlet />
      </main>
      <footer className="text-center py-6 text-lg text-accent bg-primary mt-10">
        🐵 Made for Monkey Game Lovers 🐵
      </footer>
    </div>
  );
};

export default Layout;
