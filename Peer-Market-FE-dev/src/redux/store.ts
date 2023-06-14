import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/user-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

//  Lấy RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;