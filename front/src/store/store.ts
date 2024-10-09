import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk"; // redux-thunk 임포트
import userReducer from "./reducers/userReducer";
import shopReducer from "./reducers/shopReducer";
import adminReducer from "./reducers/adminReducer";

// redux-persist 설정
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // user 상태만 저장
};

// rootReducer 생성
const rootReducer = combineReducers({
  user: userReducer,
  shop: shopReducer,
  admin: adminReducer,
});

// persistReducer를 이용하여 상태 유지 설정
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성 (redux-thunk 미들웨어 추가)
const store = createStore(persistedReducer, applyMiddleware(thunk));

// persistStore로 스토어를 감싼다
export const persistor = persistStore(store);

// RootState 타입 정의
export type RootState = ReturnType<typeof rootReducer>;

export default store;