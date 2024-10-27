// src/redux/eventos/CreateEventoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asíncrona para crear un evento
export const createEvento = createAsyncThunk(
  "eventos/createEvento",
  async (eventoData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/therapp/event",
        eventoData
      );
      return response.data; // Devuelve el evento creado
    } catch (error) {
      return rejectWithValue(error.response.data); // Maneja el error
    }
  }
);

const CreateEventoSlice = createSlice({
  name: "createEvento",
  initialState: {
    eventos: [], // Para almacenar los eventos creados, si es necesario
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvento.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos.push(action.payload); // Agrega el evento creado a la lista de eventos
      })
      .addCase(createEvento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error
      });
  },
});

// Exporta el reducer para usarlo en el store
export default CreateEventoSlice.reducer;
