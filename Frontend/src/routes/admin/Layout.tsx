// /src/admin/components/AdminLayout.tsx
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaFileAlt,
  FaFolder,
  FaUser,
  FaSignOutAlt,
  FaBox,
  FaShoppingBag,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { loggedUser, logout, selectIsAuthenticated } from "../../services/authSlice";
import { useAppDispatch } from "../../hooks/cart";

type NavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: FaHome },
  { label: "Pages", to: "/admin/pages", icon: FaFileAlt },
  { label: "Media", to: "/admin/media", icon: FaFolder },
  { label: "Products", to: "/admin/products", icon: FaBox },
  { label: "Orders", to: "/admin/orders", icon: FaShoppingBag },
  // { label: "Add Pages", to: "/admin/add-Content", icon: FaBars },
];


const Sidebar: React.FC<{ open: boolean; onClose?: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <>
      {/* MOBILE OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 
        bg-gradient-to-b from-[#ffe680] via-[#fff1b8] to-[#fff8db]
        border-r border-[#f4cf47]
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        transform transition-all duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* LOGO SECTION */}
          <div className="relative px-6 py-4 border-b border-[#f4cf47]">
            {/* glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/40 blur-3xl rounded-full"></div>

            <div className="relative flex items-center justify-between">
              <Link
                to="/admin"
                className="flex items-center gap-3 group"
              >
                <div className="bg-white rounded-2xl shadow-md p-2 border border-yellow-200">
                  <img
                    src="/C3.png"
                    alt="Logo"
                    className="h-12 object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 leading-tight">
                    C3FC Soccer
                  </h2>

                  <p className="text-xs text-gray-600 font-medium tracking-wide uppercase">
                    Admin Panel
                  </p>
                </div>
              </Link>

              <button
                className="md:hidden w-9 h-9 rounded-xl bg-white/80 border border-yellow-200 flex items-center justify-center hover:bg-white transition"
                onClick={onClose}
                aria-label="Close sidebar"
              >
                <FaBars className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* USER INFO */}
          {/* <div className="px-5 py-5">
            <div className="bg-white/70 backdrop-blur-md border border-yellow-200 rounded-3xl p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl 
                  bg-gradient-to-br from-yellow-400 to-yellow-500
                  flex items-center justify-center
                  shadow-md"
                >
                  <FaUser className="text-white text-lg" />
                </div>

                <div className="overflow-hidden">
                  <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-1">
                    Logged In
                  </p>

                  <h3 className="font-bold text-gray-900 truncate">
                    Admin User
                  </h3>

                  <p className="text-sm text-gray-600 truncate">
                    Soccer Club CMS
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* NAVIGATION */}
          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `group relative flex items-center gap-4 px-5 py-4 rounded-2xl
                    transition-all duration-200 font-medium overflow-hidden
                    ${isActive
                      ? "bg-white text-black shadow-md border border-yellow-300"
                      : "text-gray-700 hover:bg-white/80 hover:shadow-sm"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* active glow */}
                      {isActive && (
                        <div className="absolute inset-y-0 left-0 w-1.5 bg-yellow-500 rounded-r-full"></div>
                      )}

                      {/* icon */}
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200
                        ${isActive
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-md"
                            : "bg-white text-gray-700 border border-yellow-200 group-hover:bg-yellow-100"
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* text */}
                      <div className="flex-1">
                        <p
                          className={`text-sm font-semibold ${isActive
                            ? "text-gray-900"
                            : "text-gray-700"
                            }`}
                        >
                          {item.label}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          Manage {item.label.toLowerCase()}
                        </p>
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-[#f4cf47]">
            <div className="bg-white/70 border border-yellow-200 rounded-2xl p-4 text-center shadow-sm">
              <p className="text-xs uppercase tracking-[2px] text-gray-500 mb-1">
                CMS Version
              </p>

              <h4 className="font-bold text-gray-900">
                C3FC Admin v1.0
              </h4>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Topbar: React.FC<{ onToggleSidebar: () => void }> = ({
  onToggleSidebar,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(loggedUser);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className="
      sticky top-0 z-20
      bg-white/80 backdrop-blur-xl
      border-b border-yellow-200
      shadow-sm
    "
    >
      <div className="px-5 md:px-8 py-4 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE TOGGLE */}
          <button
            className="
            md:hidden
            w-11 h-11
            rounded-2xl
            bg-gradient-to-br from-yellow-400 to-yellow-500
            text-white
            shadow-md
            flex items-center justify-center
            hover:scale-105
            transition-all duration-200
          "
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FaBars size={18} />
          </button>

          {/* PAGE INFO */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              C3FC Soccer CMS
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage pages, products, orders & media
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* VIEW SITE */}
          <Link
            to="/"
            className="
            hidden md:flex items-center gap-2
            bg-gradient-to-r from-black to-gray-800
            hover:from-gray-900 hover:to-black
            text-white
            px-5 py-3
            rounded-2xl
            shadow-md
            text-sm font-semibold
            transition-all duration-200 hover:scale-[1.02]
          "
          >
            View Website
          </Link>

          {/* USER */}
          {isAuthenticated && user ? (
            <div
              className="
              flex items-center gap-4
              bg-white
              border border-yellow-200
              rounded-2xl
              px-4 py-2
              shadow-sm
            "
            >
              {/* USER INFO */}
              <div className="hidden sm:block text-right">
                <p className="text-xs uppercase tracking-[2px] text-gray-500">
                  Logged In
                </p>

                <h3 className="text-sm font-bold text-gray-900">
                  {user.username || user.email}
                </h3>
              </div>

              {/* AVATAR */}
              <div
                className="
                w-11 h-11 rounded-2xl
                bg-gradient-to-br from-yellow-400 to-yellow-500
                flex items-center justify-center
                shadow-md
              "
              >
                <FaUser className="text-white" size={16} />
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="
                w-11 h-11 rounded-2xl
                bg-red-50
                border border-red-100
                text-red-600
                flex items-center justify-center
                hover:bg-red-500 hover:text-white
                transition-all duration-200
              "
                aria-label="Logout"
              >
                <FaSignOutAlt size={16} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

const Layout: React.FC<{ children: React.ReactNode; title?: string }> = ({
  title,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-[#fffdf5]
      via-[#fff9e8]
      to-[#fff4cc]
    "
    >
      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN AREA */}
      <div className="md:pl-72 transition-all duration-300">
        {/* TOPBAR */}
        <Topbar
          onToggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        {/* PAGE CONTENT */}
        <main className="p-5 md:p-8">
          {/* TITLE */}
          {title && (
            <div className="mb-8">
              <div
                className="
                inline-flex items-center gap-3
                bg-white/80 backdrop-blur-md
                border border-yellow-200
                rounded-3xl
                px-6 py-4
                shadow-sm
              "
              >
                <div
                  className="
                  w-12 h-12 rounded-2xl
                  bg-gradient-to-br from-yellow-400 to-yellow-500
                  flex items-center justify-center
                  shadow-md
                "
                >
                  <FaHome className="text-white text-lg" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[2px] text-gray-500">
                    Admin Section
                  </p>

                  <h2 className="text-2xl font-extrabold text-gray-900">
                    {title}
                  </h2>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT WRAPPER */}
          <div
            className="
            bg-white/70
            backdrop-blur-sm
            border border-yellow-100
            rounded-[32px]
            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
            p-5 md:p-8
          "
          >
            <div className="space-y-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;