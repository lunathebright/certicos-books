import { Link, useLocation } from "react-router-dom";
import { navItems } from "../data/constants/nav";

export default function Header() {
  const location = useLocation();

  return (
    <nav className="flex p-6">
      <h1 className="text-title1">CERTICOS BOOKS</h1>
      <ul className="flex gap-[56px] mx-auto -translate-x-[200px]">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`py-1 text-body1 border-b ${
                location.pathname === item.path
                  ? "border-b-primary"
                  : "border-b-transparent"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
