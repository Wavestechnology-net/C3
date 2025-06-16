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
import permissionSlice from "./userPermissionSlice";

// Persist config for slices
const authPersistConfig = {
  key: "auth",
  storage,
};

const permissionPersistConfig = {
  key: "permission",
  storage,
};

// Root reducer
const rootReducer = combineReducers({
  permission: persistReducer(permissionPersistConfig, permissionSlice),
  auth: persistReducer(authPersistConfig, authSlice),
  [authApi.reducerPath]: authApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [tryoutApi.reducerPath]: tryoutApi.reducer,
  [tryoutRegistrationApi.reducerPath]: tryoutRegistrationApi.reducer,
  [programApi.reducerPath]: programApi.reducer,
  [programRegistrationApi.reducerPath]: programRegistrationApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
  [staffApi.reducerPath]: staffApi.reducer,
});

// Store configuration
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      newsApi.middleware,
      tryoutApi.middleware,
      tryoutRegistrationApi.middleware,
      programApi.middleware,
      programRegistrationApi.middleware,
      teamApi.middleware,
      staffApi.middleware,
    ),
});

// Persistor
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
