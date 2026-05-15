
// export default Header;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../services/store";
import { NavbarCart } from "./NavbarCart";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Recreational", href: "/recreational" },
  { label: "Youth Academy", href: "/youth" },
  { label: "Competitive", href: "/competitive" },
  { label: "Tryouts", href: "/tryouts" },
  { label: "Contact Us", href: "/contact" },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // 🔐 AUTH-AWARE SHOP NAVIGATION
  const handleShopClick = () => {
    if (isAuthenticated) {
      navigate("/shop");
    } else {
      navigate("/register");
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <div className="relative z-50">
      <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white">

        {/* TOP BAR */}
        <div className="w-full bg-white px-6 py-2 flex items-center justify-end space-x-4 text-gray-600 text-xl">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>

          {/* SHOP BUTTON (AUTH LOGIC) */}
          <button
            onClick={handleShopClick}
            className="bg-[#dc3973] hover:bg-yellow-500 text-black font-bold px-4 py-2 text-sm rounded"
          >
            Shop
          </button>

          <NavbarCart />

          <Link
            to="/tryouts"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 text-sm rounded"
          >
            PLAY FOR C3FC
          </Link>
        </div>

        {/* MAIN HEADER */}
        <div className="w-full bg-white px-4 py-5 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="z-50">
            <img src="/C3.png" alt="logo" className="h-16 md:h-20" />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`hover:text-blue-700 ${location.pathname === item.href ? "text-blue-700" : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {isMobileMenuOpen && (
        <>
          {/* BACKDROP */}
          <div
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* DRAWER */}
          <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-xl z-50 transition-transform duration-300">

            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <img src="/C3.png" className="h-10" />
              <button onClick={closeMobileMenu} className="text-xl">
                ✕
              </button>
            </div>

            {/* NAV */}
            <nav className="flex flex-col px-4 py-4 space-y-2 text-sm font-semibold">

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={`py-2 ${location.pathname === item.href
                    ? "text-blue-700"
                    : "text-gray-800"
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* SHOP CTA */}
              <button
                onClick={() => {
                  closeMobileMenu();
                  handleShopClick();
                }}
                className="mt-4 bg-pink-500 text-white py-2 rounded"
              >
                Shop
              </button>

            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;