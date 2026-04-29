import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { authApi } from "./apis/authApi";
import { newsApi } from "./apis/newsApi";
import { tryoutApi } from "./apis/tryoutApi";
import { tryoutRegistrationApi } from "./apis/tryoutRegistrationApi";
import { programApi } from "./apis/programApi";
import { programRegistrationApi } from "./apis/programRegistrationApi";
import { teamApi } from "./apis/teamApi";
import { staffApi } from "./apis/staffApi";

import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import permissionSlice from "./userPermissionSlice";
import { mediaApi } from "./apis/mediaApi";
import { pageApi } from "./apis/pageApi";
import { autoLogoutMiddleware } from "./autoLogoutMiddleware";
import { publicApi } from "./apis/publicApi";
import { productApi } from "./apis/productApi";
import { orderApi } from "./apis/orderApi";
// import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

// Persist config for slices
const authPersistConfig = {
  key: "auth",
  storage,
};

const permissionPersistConfig = {
  key: "permission",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

// Root reducer
const rootReducer = combineReducers({
  permission: persistReducer(permissionPersistConfig, permissionSlice),
  auth: persistReducer(authPersistConfig, authSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
  [authApi.reducerPath]: authApi.reducer,
  [pageApi.reducerPath]: pageApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tryoutApi.reducerPath]: tryoutApi.reducer,
  [tryoutRegistrationApi.reducerPath]: tryoutRegistrationApi.reducer,
  [programApi.reducerPath]: programApi.reducer,
  [programRegistrationApi.reducerPath]: programRegistrationApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [mediaApi.reducerPath]: mediaApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

// Store configuration
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      pageApi.middleware,
      newsApi.middleware,
      tryoutApi.middleware,
      tryoutRegistrationApi.middleware,
      programApi.middleware,
      programRegistrationApi.middleware,
      teamApi.middleware,
      staffApi.middleware,
      mediaApi.middleware,
      publicApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      autoLogoutMiddleware
    ),
});

// Persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
