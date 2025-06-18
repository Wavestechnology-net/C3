import React, { useState } from "react";

const navItems = [
  { label: "About", hasDropdown: false, href: "/about" },

  { label: "Recreational", hasDropdown: false, href: "/recreational" },
  { label: "Youth Academy", hasDropdown: false, href: "/youth" },
  { label: "Competitive", hasDropdown: true },
  { label: "Elite", hasDropdown: true },
  { label: "Tryouts", hasDropdown: false },
  { label: "Events", hasDropdown: true },
  { label: "News", hasDropdown: false },
  { label: "Contact Us", hasDropdown: false, href: "/contact" },
];

const Header: React.FC = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div className="relative z-50">
      <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white">
        {/* Top Bar */}
        <div className="w-full bg-white px-6 py-1 flex items-center justify-end space-x-4 text-gray-600 text-xl">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a
            href="/play-for-rise"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 text-sm rounded"
          >
            PLAY FOR RISE
          </a>
        </div>

        {/* Main Header */}
        <div className="w-full bg-white px-2 py-1 flex items-center justify-between">
          {/* Floating Logo */}
          <div className="absolute top-[30px] left-8 z-50">
            <a href="/">
              <img
                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5ec3f840f755f1731216519f_RISE-logo.svg"
                alt="RISE SC Logo"
                className="h-18 md:h-20 lg:h-30"
              />
            </a>
          </div>

          {/* Right Section: Desktop Nav + Mobile Button */}
          <div className="flex items-center justify-end w-full space-x-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-gray-800 mb-1">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => item.hasDropdown ? toggleDropdown(item.label) : null}
                      className="flex items-center justify-between py-2 px-2 text-left font-semibold hover:text-pink-600 w-full"
                    >
                      {item.label}
                      <span className="ml-2 text-sm">
                        {openDropdown === item.label ? "▲" : "▼"}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="py-2 px-2 font-semibold hover:text-pink-600"
                    >
                      {item.label}
                    </a>
                  )}

                  {item.hasDropdown && openDropdown === item.label && (
                    <div className="ml-4 pl-2 border-l border-gray-200">
                      <a href="#" className="block py-1 text-sm hover:text-pink-500">
                        Option 1
                      </a>
                      <a href="#" className="block py-1 text-sm hover:text-pink-500">
                        Option 2
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu}>
                <i className="fas fa-bars text-2xl text-gray-800"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-[110px] left-0 w-full bg-white shadow-md md:hidden z-40">
          <nav className="flex flex-col px-6 py-4 space-y-2 text-sm font-semibold text-gray-800">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.hasDropdown ? (
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between py-2 w-full text-left hover:text-pink-600"
                  >
                    {item.label}
                    <span className="ml-2 text-xs">
                      {openDropdown === item.label ? "▲" : "▼"}
                    </span>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="py-2 hover:text-pink-600"
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown options */}
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="ml-4 pl-2 border-l border-gray-200">
                    <a href="#" className="block py-1 text-sm hover:text-pink-500">
                      Option 1
                    </a>
                    <a href="#" className="block py-1 text-sm hover:text-pink-500">
                      Option 2
                    </a>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

    </div>
  );
};

export default Header;
