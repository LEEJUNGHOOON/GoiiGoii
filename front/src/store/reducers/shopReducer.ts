import { GET_ALLPRODUCTS, GET_PRODUCT_DETAIL, GET_PRODUCTS_BY_CATEGORY } from "../types";

export default function shopReducer(state = {}, action: any) {
  switch (action.type) {
    case GET_ALLPRODUCTS:
      return { ...state, getAllProductsSuccess: action.payload };
      break;
    case GET_PRODUCTS_BY_CATEGORY:
      return { ...state, getProductsByatagorySuccess: action.payload };
      break;
    case GET_PRODUCT_DETAIL:
      return { ...state, getProductDetailSuccess: action.payload };
      break;
    default:
      return state;
  }
}
