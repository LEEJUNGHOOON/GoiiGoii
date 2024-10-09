import {
  LOGIN_USER,
  IDCHECK_USER,
  SINGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  ADD_USER_CART,
} from "../types";

interface UserState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SINGIN_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case LOGOUT_USER:
      return {
        ...state,
        logoutSuccess: action.payload,
        isAuthenticated: false,
        token: null,
        user: null,
      };
    case IDCHECK_USER:
      return { ...state, idCheckSuccess: action.payload };
    case UPDATE_USER:
      return { ...state, updateSuccess: action.payload };
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case ADD_USER_CART:
      return {
        ...state,
        addUserCartSuccess: action.payload,
      };
    default:
      return state;
  }
}
