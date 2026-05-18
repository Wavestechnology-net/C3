
// export default Header;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../services/store";
import { useAppDispatch } from "../hooks/cart";
import { useLogoutMutation } from "../services/apis/authApi";
import { logout } from "../services/authSlice";

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
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [logoutApi] = useLogoutMutation();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const user = useSelector(
    (state: RootState) => state.auth.user
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

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(logout());

      navigate("/login");
    }
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
          {/* <button
            onClick={handleShopClick}
            className="bg-[#dc3973] hover:bg-yellow-500 text-black font-bold px-4 py-2 text-sm rounded"
          >
            Shop
          </button> */}

          {/* <NavbarCart /> */}

          <Link
            to="/tryouts"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 text-sm rounded"
          >
            PLAY FOR C3FC
          </Link>
        </div>

        {/* MAIN HEADER */}
        {/* <div className="w-full bg-white px-4 flex items-center justify-between"> */}
        <div className="w-full bg-white px-6 md:px-8 h-20 flex items-center justify-between">

          {/* LOGO */}
          {/* <Link to="/" className="z-50">
            <img src="/C3.png" alt="logo" className="h-16 md:h-20" />
          </Link> */}
          <Link to="/" className="flex items-center">
            <img
              src="/C3.png"
              alt="logo"
              className="h-14 md:h-36 object-contain -translate-y-6"
            />
          </Link>

          {/* DESKTOP NAV */}
          {/* <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-800">
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
          </div> */}

          {/* DESKTOP NAV */}
          {/* <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-800"> */}
          <div className="hidden md:flex items-center h-full space-x-6 text-sm font-semibold text-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`hover:text-blue-700 ${location.pathname === item.href
                  ? "text-blue-700"
                  : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* AUTH SECTION */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">

                <button
                  onClick={() => navigate("/user-dashboard")}
                  className="font-semibold hover:text-blue-700"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>

              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg font-bold"
              >
                Sign In
              </button>
            )}
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
            {/* <div className="flex items-center justify-between px-4 py-4 border-b"> */}
            <div className="flex items-center justify-between px-4 h-16 border-b">
              <img
                src="/C3.png"
                className="h-12 object-contain -translate-y-0.5"
              />
              <button
                onClick={closeMobileMenu}
                className="text-2xl leading-none"
              >
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

              {/* AUTH SECTION */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate("/user-dashboard");
                    }}
                    className="text-left py-2 text-gray-800"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="text-left py-2 text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="py-2 text-gray-800"
                  >
                    Login
                  </Link>

                  {/* <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="py-2 text-gray-800"
                  >
                    Register
                  </Link> */}
                </>
              )}

              {/* SHOP CTA */}
              {/* <button
                onClick={() => {
                  closeMobileMenu();
                  handleShopClick();
                }}
                className="mt-4 bg-pink-500 text-white py-2 rounded"
              >
                Shop
              </button> */}

            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;