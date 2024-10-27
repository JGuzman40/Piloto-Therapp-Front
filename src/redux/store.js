// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./login/LoginUsersSlice";
import FacilitadoresSlice from "./registerFacilitador/registerFacilitadorSlice";
import CreateEventoSlice from "./eventos/CreateEventoSlice";
import EventosSlice from "./eventos/GetEventosSlice";
import SessionSlice from "./eventos/GetProgramacionSesionSlice";

const store = configureStore({
  reducer: {
    login: LoginSlice,
    facilitadores: FacilitadoresSlice,
    evento: CreateEventoSlice,
    eventos: EventosSlice,
    sessions: SessionSlice,
  },
});

export default store;
