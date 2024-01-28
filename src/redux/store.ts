import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { productAPI } from "./api/productApi";
import { userReducer } from "./reducer/userReduces";

export const server = import.meta.env.VITE_BACKEND_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, productAPI.middleware),
});