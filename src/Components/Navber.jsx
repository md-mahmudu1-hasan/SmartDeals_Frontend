import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/all-products" },
    { name: "My Products", path: "/my-products" },
    { name: "My Bids", path: "/my-bids" },
    { name: "Create Product", path: "/create-product" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            <span className="text-black">Smart</span>
            <span className="text-purple-600">Deals</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 font-medium"
                    : "text-gray-700 hover:text-purple-600 transition"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Login & Register Buttons */}
          <div className="hidden md:flex space-x-3">
            <Link
              to="/login"
              className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-purple-600"
            >
              {item.name}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md text-center"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
