// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./login/LoginUsersSlice";
import FacilitadoresSlice from "./registerFacilitador/registerFacilitadorSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    facilitadores: FacilitadoresSlice,
  },
});

export default store;
