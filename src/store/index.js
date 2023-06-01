import { combineReducers,configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// Slice 
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
}));

export default configureStore({
  reducer:{
    app: appSlice,
    auth: authSlice
  }
})