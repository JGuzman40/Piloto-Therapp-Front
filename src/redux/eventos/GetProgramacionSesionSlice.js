import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define una acción asíncrona para obtener las sesiones
export const getSessions = createAsyncThunk(
  "sesiones/getAllSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/therapp/session"); // Ajusta la URL según tu API
      return response.data; // Devuelve la lista de sesiones
    } catch (error) {
      return rejectWithValue(error.response.data); // Maneja el error
    }
  }
);

const ProgramacionSessionSlice = createSlice({
  name: "sesiones",
  initialState: {
    sesiones: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.sesiones = action.payload; // Guarda la lista de sesiones
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error
      });
  },
});

export default ProgramacionSessionSlice.reducer;
