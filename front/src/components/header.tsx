"use client";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import styles from "./Header.module.css";
import Menu from "./slidemenu";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store"; // RootState 타입을 가져옵니다.
import { logoutUser } from "../store/actions/userAction"; // 로그아웃 액션을 가져옵니다.

const Header: React.FC = () => {
  const data = require("../../public/constraint/datas.json");
  const [isOpen, setIsOpen] = useState(false); // isOpen 상태 추가 및 초기값 false로 설정
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen); // 메뉴를 열고 닫는 함수
  };

  const handleLogout = () => {
    dispatch(logoutUser({}));
    router.push("/");
    sessionStorage.clear();
  };

  return (
    <>
      <div className="w-[100%] m-auto p-0 flex items-center flex-col flex-grow relative">
        <div className="w-full flex items-start">
          <div className="w-full bg-white relative table p-3 align-middle">
            <div className="relative table-cell text-lg w-1/3">
              <ul className="list-none p-0 ml-10 flex hidden md:flex">
                <li className="inline-block mr-2">
                  <Link
                    href="/about"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    About
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/productlist/All"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    Shop
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/archive"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    Archive
                  </Link>
                </li>
                <li className="inline-block mr-2">
                  <Link
                    href="/contact"
                    className="text-black transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                  >
                    Contact
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
                {isAuthenticated ? (
                  <>
                    <li className="inline-block mr-2">
                      <Link
                        href="/mypage"
                        className="text-black no-underline transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                      >
                        My Page
                      </Link>
                    </li>
                    <li className="inline-block mr-2">
                      <Link
                        href="/cart"
                        className="text-black no-underline transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                      >
                        Cart
                      </Link>
                    </li>
                    <li className="inline-block mr-2">
                      <button
                        onClick={handleLogout}
                        className="text-black no-underline transition-colors duration-300 ease-in-out hover:text-gray-500 hover:opacity-70"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
