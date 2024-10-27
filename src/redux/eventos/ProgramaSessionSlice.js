// src/redux/eventos/ProgramaSessionSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL base de tu API
const API_URL = "http://localhost:3001/therapp/session";

// Thunk para crear una nueva sesión
export const createSession = createAsyncThunk(
  "sessions/createSession",
  async (sessionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, sessionData);
      return response.data.session; // Devuelve la sesión creada
    } catch (error) {
      return rejectWithValue(error.response.data); // Manejo de errores
    }
  }
);

const ProgramaSessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Aquí puedes agregar reducers adicionales si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload; // Agrega la nueva sesión al estado
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error en el estado
      });
  },
});

// Exporta el reducer
export default ProgramaSessionSlice.reducer;
