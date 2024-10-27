import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL base de tu API para los segmentos
const API_URL = "http://localhost:3001/therapp/segment";

// Thunk para crear un nuevo segmento
export const createSegment = createAsyncThunk(
  "segments/createSegment",
  async (segmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, segmentData);
      return response.data.segment; // Devuelve el segmento creado
    } catch (error) {
      return rejectWithValue(error.response.data); // Manejo de errores
    }
  }
);

const SegmentsEventoSlice = createSlice({
  name: "segments",
  initialState: {
    segment: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Aquí puedes agregar reducers adicionales si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSegment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSegment.fulfilled, (state, action) => {
        state.loading = false;
        state.segment = action.payload; // Agrega el nuevo segmento al estado
      })
      .addCase(createSegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error en el estado
      });
  },
});

// Exporta el reducer
export default SegmentsEventoSlice.reducer;
