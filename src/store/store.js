import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { api } from "@/api/thaaliApi";
import { loggedIn } from '@/screens/login/loginSlice';

export const store = configureStore({
  reducer: {
    loggedIn: loggedIn.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})