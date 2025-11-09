import { use, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Authentications/AuthContext/AuthContext";
import Loader from "../Pages/Loader/Loader";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, SignOut, loading } = use(AuthContext);

  if (loading) {
    return <Loader/>
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/all-products" },
    { name: "My Products", path: "/my-products" },
    { name: "My Bids", path: "/my-bids" },
    { name: "Create Products", path: "/CreateProducts" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-400/70 via-purple-200/70 to-pink-200/70
">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            <span className="text-black">Smart</span>
            <span className="text-purple-600">Deals</span>
          </Link>
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

          <div className="hidden md:flex space-x-3">
            {user ? (
              <button
                onClick={SignOut}
                className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50"
              >
                Login
              </Link>
            )}
            {user ? (
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <Link
                to="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Register
              </Link>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
            {user ? (
              <button
                onClick={SignOut}
                className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50"
              >
                Login
              </Link>
            )}
            {user ? (
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-center"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
