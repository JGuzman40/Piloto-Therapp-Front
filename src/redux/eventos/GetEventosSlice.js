// src/redux/eventos/eventosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción asíncrona para obtener eventos
export const getEventos = createAsyncThunk(
  "eventos/getEventos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/therapp/event");
      return response.data; // Devuelve la lista de eventos
    } catch (error) {
      return rejectWithValue(error.response.data); // Maneja el error
    }
  }
);

const EventosSlice = createSlice({
  name: "eventos",
  initialState: {
    eventos: [],
    selectedEvento: null, // Para almacenar el evento seleccionado
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedEvento: (state, action) => {
      state.selectedEvento = action.payload; // Actualiza el evento seleccionado
    },
    clearSelectedEvento: (state) => {
      state.selectedEvento = null; // Limpia el evento seleccionado
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventos.fulfilled, (state, action) => {
        state.loading = false;
        state.eventos = action.payload; // Guarda la lista de eventos
      })
      .addCase(getEventos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error
      });
  },
});

// Exporta las acciones
export const { setSelectedEvento, clearSelectedEvento } = EventosSlice.actions;

// Exporta el reducer
export default EventosSlice.reducer;
