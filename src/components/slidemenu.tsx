import React from 'react';
import Link from 'next/link';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-start items-start transition duration-1000 ease-in-out">
      <div className="bg-white w-64 h-full p-4">
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
                about
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/product/list.html">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                shop
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                archive
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/">
              <span className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70 cursor-pointer">
                Tip
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
