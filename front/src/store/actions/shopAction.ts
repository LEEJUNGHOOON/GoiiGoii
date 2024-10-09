import axios from "axios";
import {
  GET_ALLPRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS_BY_CATEGORY,
} from "../types";

//검색한 장르 영화목록 가져오기
export function getAllProducts() {
  const request = axios
    .get("http://localhost:3001/products/getAllProducts") // NestJS API 엔드포인트
    .then((response) => response.data);
  return {
    type: GET_ALLPRODUCTS,
    payload: request,
  };
}
export function getProductsByCategory(category: string) {
  const request = axios
    .get(`http://localhost:3001/products/category`, { params: { category } })
    .then((response) => response.data);

  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    payload: request,
  };
}
export const getProductDetail = (productId: string) => {
  const request = axios
    .get(`http://localhost:3001/products/${productId}`) // NestJS API 엔드포인트
    .then((response) => response.data);

  return {
    type: GET_PRODUCT_DETAIL,
    payload: request,
  };
};
