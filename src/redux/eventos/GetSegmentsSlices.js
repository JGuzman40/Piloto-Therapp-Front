import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define la URL base de la API para los segmentos
const API_URL = "http://localhost:3001/therapp/segment";

// Thunk para obtener los segmentos de un evento específico
export const getSegments = createAsyncThunk(
  "segments/getSegments",
  async ({ rejectWithValue }) => {
    // Acepta eventId como argumento
    try {
      const response = await axios.get(`${API_URL}`); // Asegúrate de que el backend acepte el query param
      return response.data; // Suponiendo que la respuesta incluye una lista de segmentos en data.segments
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GetSegmentosSlice = createSlice({
  name: "segmentos",
  initialState: {
    segmentos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSegments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSegments.fulfilled, (state, action) => {
        state.loading = false;
        state.segmentos = action.payload; // Guarda los segmentos en el estado
      })
      .addCase(getSegments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Guarda el error en el estado
      });
  },
});

// Exporta el reducer
export default GetSegmentosSlice.reducer;
