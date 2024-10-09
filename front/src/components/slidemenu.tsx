import React from "react";
import Link from "next/link";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex justify-start items-start transition-opacity duration-500 ease-in-out z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white w-64 h-full p-4 transition-transform duration-500 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <button
          className="mb-4 text-black transition-colors duration-1000 ease-in-out hover:text-gray-500 hover:opacity-70"
          onClick={onClose}
        >
          Close
        </button>
        <ul className="list-none p-0">
          <li className="mb-4">
            <Link href="/about.html">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                About
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/product/list.html">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                Shop
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                Archive
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/contact">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                Contact
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
