"use client";
import { auth } from "@/store/actions/userAction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const [password, setPassword] = useState("");
  const onIdChange = (event) => {
    setId(event.currentTarget.value);
  };
  const onPwChange = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onLogin = () => {
    if (!id && password) {
      alert("아이디를 입력해주세요");
      return;
    } else if (id && !password) {
      alert("비밀번호를 입력해주세요");
      return;
    } else if (!id && !password) {
      alert("모든필드를 입력해주세요");
      return;
    }
    let body = {
      id: id,
      password: password,
    };
    const data = dispatch(auth(body));
    data.payload.then((result) => {
      console.log(result);
      if (result.token !== null) {
        router.push("/");
        console.log("logined");
        sessionStorage.setItem("userId", result.user);
      } else if (!result.token) {
        alert("Failed to login");
      }
    });
  };
  return (
    <div className="bg-white  flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full  login">
        <form className="mx-52">
          <div className="mb-4 login__field">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="ID"
              value={id}
              onChange={onIdChange}
            />
          </div>
          <div className="mb-6 login__field">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={onPwChange}
            />
          </div>
          <div className="login__security mb-10">
            <div className="secret flex items-center">
              <img
                src="//img.echosting.cafe24.com/skin/skin/member/ico_access.svg"
                alt="security"
                className="mr-2"
              />
              <span>보안 접속</span>
            </div>
          </div>
          <div className="flex items-center justify-center login__button">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline min-w-96 md:w-5 "
              type="button"
              onClick={onLogin}
            >
              로그인
            </button>
          </div>
        </form>
        <ul className="login__util mt-8 flex justify-center space-x-4 text-gray-700 text-sm ">
          <li>
            <a href="#">아이디 찾기</a>
          </li>
          <li>
            <a href="#">비밀번호 찾기</a>
          </li>
          <li>
            <a href="#">회원가입</a>
          </li>
        </ul>
        <div className="login__sns mt-10 flex flex-col md:flex-row md:space-x-4">
          <a
            href="#"
            className="btnKakao w-full py-3 bg-yellow-400 text-black rounded-lg flex justify-center items-center mb-2 md:mb-0"
          >
            카카오 로그인
          </a>
          <a
            href="#"
            className="btnNaver w-full py-3 bg-green-600 text-white rounded-lg flex justify-center items-center mb-2 md:mb-0"
          >
            네이버 로그인
          </a>
          <a
            href="#"
            className="btnGoogle w-full py-3 bg-white border border-gray-400 text-black rounded-lg flex justify-center items-center mb-2 md:mb-0"
          >
            구글 로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
