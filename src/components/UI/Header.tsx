import { FormData } from "../../lib/types";

interface HeaderProps {
  logout: () => void;
  userData: FormData | null;
}

const Header = ({ logout, userData }: HeaderProps) => {
  if (userData === null) return;

  return (
    <header>
      {userData.username} <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
