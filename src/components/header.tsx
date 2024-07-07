"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Menu from "./slidemenu";

const Header: React.FC = () => {
  const data = require("../../public/constraint/datas.json");
  const [isOpen, setIsOpen] = useState(false); // isOpen 상태 추가 및 초기값 false로 설정

  const toggleMenu = () => {
    setIsOpen(!isOpen); // 메뉴를 열고 닫는 함수
  };
  return (
    <>
      <div className=" w-[100%] m-auto p-0 flex items-center flex-col flex-grow relative ">
        <div className="w-full flex items-start">
          <div className="w-full bg-white relative table p-3 align-middle">
            <div className="relative table-cell text-lg w-1/3">
              <ul className="list-none p-0 ml-10 flex hidden md:flex">
                <li className="inline-block mr-2">
                  <Link
                    href="/about.html"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    about
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/product/list.html"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    shop
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    archive
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    Tip
                  </Link>
                </li>
              </ul>
              <button
                className="block ml-6 md:hidden text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                onClick={toggleMenu}
              >
                ...
              </button>
              {isOpen && <Menu isOpen={isOpen} onClose={toggleMenu} />}
            </div>
            <div className="flex justify-center items-center h-20">
              <Link
                href="/"
                className="text-2xl md:text-4xl leading-none text-black"
              >
                {data.mallName}
              </Link>
            </div>
            <div className="relative table-cell text-sm md:text-lg w-1/3 text-right">
              <ul className="list-none p-0 mr-5 md:mr-10 flex justify-end">
                <li className="inline-block mr-2">
                  <Link
                    href="/agreement"
                    className="text-black no-underline transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    Join
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/login"
                    className="text-black no-underline transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Header;
