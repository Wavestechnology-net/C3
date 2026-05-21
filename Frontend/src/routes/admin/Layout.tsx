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

const Sidebar: React.FC<{ open: boolean; onClose?: () => void }> = ({ open, onClose }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#ffef99] border-r border-[#e0b100] transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0b100]">
          <Link to="/admin" className="text-lg font-bold text-gray-800">
            <img src="/C3.png" alt="Logo" className="h-14" />
          </Link>
          <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={onClose} aria-label="Close sidebar">
            <FaBars />
          </button>
        </div>

        <nav className="px-2 py-5  flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 my-1 rounded-md text-sm font-medium ${isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

const Topbar: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(loggedUser)

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full bg-[#ffef99] border-b px-6 py-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <FaBars />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 mt-2 mb-1">Admin Panel, C3FC Soccer</h1>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/" className="hidden sm:inline-block bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
          View Site
        </Link>
        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            {/* User Avatar / Icon */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Hello, <span className="font-semibold">{user.username || user.email}</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center border">
                <FaUser className="text-gray-600" size={16} />
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-full transition"
              aria-label="Logout"
            >
              <FaSignOutAlt size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

const Layout: React.FC<{ children: React.ReactNode; title?: string }> = ({ title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:pl-64">
        <Topbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />

        <main className="p-6">
          {title && <h2 className="text-2xl font-semibold mb-4">{title}</h2>}

          <div className="space-y-6"><Outlet /></div>
        </main>
      </div>
    </div>
  );
};

export default Layout;