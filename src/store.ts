import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import clientsSlice from "./features/clients/clientsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    clients: clientsSlice,
  },
});

export default store;
