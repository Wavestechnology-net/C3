import React from "react";

const navItems = [
  { label: "About", hasDropdown: true },
  { label: "Recreational", hasDropdown: true },
  { label: "Youth Academy", hasDropdown: true },
  { label: "Competitive", hasDropdown: true },
  { label: "Elite", hasDropdown: true },
  { label: "Tryouts", hasDropdown: false },
  { label: "Events", hasDropdown: true },
  { label: "News", hasDropdown: false },
  { label: "Contact Us", hasDropdown: false },
];

const Header: React.FC = () => (
  <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
    {/* Logo */}
    <div className="flex items-center">
      <a href="/">
        <img
          src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5ec3f840f755f1731216519f_RISE-logo.svg"
          alt="RISE SC Logo"
          className="h-14"
        />
      </a>
    </div>

    {/* Navigation */}
    <nav className="flex items-center space-x-6 text-sm font-semibold text-gray-800">
      {navItems.map((item) => (
        <div key={item.label} className="relative group">
          <button className="flex items-center hover:text-pink-600 transition">
            {item.label}
            {item.hasDropdown && (
              <span className="ml-1 text-pink-600">&#9660;</span>
            )}
          </button>
          {/* Example dropdown (optional) */}
          {item.hasDropdown && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
              <ul className="py-2">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Option 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Option 2
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>

    {/* Social icons & CTA */}
    <div className="flex items-center space-x-4">
      <div className="flex space-x-3 text-xl text-gray-600">
        <a href="#">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-youtube"></i>
        </a>
      </div>
      <a
        href="/play-for-rise"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
      >
        PLAY FOR RISE
      </a>
    </div>
  </header>
);

export default Header;
