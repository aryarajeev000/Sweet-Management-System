import { logout } from "../auth/auth.service";
import { useEffect, useState } from "react";

interface NavbarProps {
  onSearch: (value: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        🍬 <span>Sweet Shop</span>
      </div>

      <div className="nav-center">
        <input
          placeholder="Search sweets..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="nav-right">
        <button className="theme-btn" onClick={toggleTheme}>
          {dark ? "☀️" : "🌙"}
        </button>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
