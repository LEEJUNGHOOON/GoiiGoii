import { ADD_PRODUCT_ADMIN } from "../types";

export default function adminReducer(state = {}, action: any) {
  switch (action.type) {
    case ADD_PRODUCT_ADMIN:
      return { ...state, addProductAdminSuccess: action.payload };
      break;
    default:
      return state;
  }
}
