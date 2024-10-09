import axios from "axios";
import { ADD_PRODUCT_ADMIN } from "../types";

//검색한 장르 영화목록 가져오기
export function addProductAdmin(dataTosubmit) {
  const request = axios
    .post("http://localhost:3001/products/createProduct", dataTosubmit)
    .then((response) => response.data);
  return {
    type: ADD_PRODUCT_ADMIN,
    payload: request,
  };
}
