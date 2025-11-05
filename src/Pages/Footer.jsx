import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#0b1a2a] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-3">
            <span className="text-purple-500">Smart</span>Deals
          </h2>
          <p className="text-sm leading-6">
            Your trusted marketplace for authentic local products.
            Discover the best deals from across Bangladesh.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-purple-400">All Products</a></li>
            <li><a href="#" className="hover:text-purple-400">Dashboard</a></li>
            <li><a href="#" className="hover:text-purple-400">Login</a></li>
            <li><a href="#" className="hover:text-purple-400">Register</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-purple-400">Electronics</a></li>
            <li><a href="#" className="hover:text-purple-400">Fashion</a></li>
            <li><a href="#" className="hover:text-purple-400">Home & Living</a></li>
            <li><a href="#" className="hover:text-purple-400">Groceries</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact & Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail className="text-purple-400" /> support@smartdeals.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-purple-400" /> +880 123 624 789
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn className="text-purple-400" /> 123 Commerce Street, Dhaka, Bangladesh
            </li>
          </ul>
          <div className="flex items-center gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-purple-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-purple-400"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-400"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © 2025 SmartDeals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
