import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/constants/nav";

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex p-6">
      <h1 className="text-title1">CERTICOS BOOKS</h1>
      <nav className="flex gap-[56px] mx-auto -translate-x-[200px]">
        {Object.values(navItems).map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`py-1 text-body1 border-b transition-colors duration-300 ${
                location.pathname === item.path
                  ? "border-b-primary"
                  : "border-b-transparent"
              }`}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </nav>
    </header>
  );
}
