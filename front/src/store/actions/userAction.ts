import axios from "axios";
import Cookies from "js-cookie";

import {
  LOGIN_USER,
  SINGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_USER_CART,
  UPDATE_USER,
  IDCHECK_USER,
} from "../types";

const API_URL = process.env.NEST_API_URL;
//로그인
export function loginUser(dataTosubmit) {
  const request = axios
    .post(`http://localhost:3001/member/signin`, dataTosubmit)
    .then((response) => response.data);
  return {
    //
    type: LOGIN_USER,
    payload: request,
  };
}

//아이디중복확인
export function idCheck(dataTosubmit) {
  const request = axios
    .post(`http://localhost:3001/member/idCheck`, dataTosubmit)
    .then((response) => response.data);
  return {
    //
    type: IDCHECK_USER,
    payload: request,
  };
}
//회원가입
export function signinUser(dataTosubmit) {
  const request = axios
    .post(`http://localhost:3001/member/signin`, dataTosubmit)
    .then((response) => response.data);
  return {
    type: SINGIN_USER,
    payload: request,
  };
}
//로그아웃
export function logoutUser(dataToSubmit: any) {
  const request = axios
    .get(`http://localhost:3001/auth/logout`, {
      params: dataToSubmit,
    })
    .then((response) => {
      // 로그아웃 시 쿠키에서 JWT 토큰 제거
      Cookies.remove("token");
      return response.data;
    });

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

//인증처리
export function auth(dataTosubmit) {
  const request = axios
    .post(`http://localhost:3001/auth/login`, dataTosubmit)
    .then((response) => {
      const { token } = response.data.access_token;
      const user = response.data.user; // 유저 정보 추출
      console.log(response);
      // JWT 토큰을 쿠키에 저장
      Cookies.set("token", token, { expires: 7 });
      return { token, user };
    });
  return {
    type: AUTH_USER,
    payload: request,
  };
}

//사용자 정보 업데이트
export function addUserCart(dataTosubmit) {
  const request = axios
    .post("http://localhost:3001/member/add-to-cart", dataTosubmit)
    .then((response) => response.data);
  return {
    type: ADD_USER_CART,
    payload: request,
  };
}
