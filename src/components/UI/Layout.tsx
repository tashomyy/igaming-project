import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>My App Header</header>
      <nav>Navigation Bar</nav>
      <main className="h-full">
        <Outlet />
      </main>
      <footer className="mt-auto">My App Footer</footer>
    </div>
  );
};

export default Layout;
