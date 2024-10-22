import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL del backend
const BASE_URL = "http://localhost:3001/therapp/users";

// Thunk para crear un nuevo facilitador
export const registerFacilitador = createAsyncThunk(
  "facilitadores/createFacilitador",
  async (facilitadorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL, facilitadorData);
      return response.data; // Retornar datos si la creación es exitosa
    } catch (error) {
      return rejectWithValue(error.response.data); // Manejar error
    }
  }
);

// Thunk para obtener todos los facilitadores (si lo necesitas)
export const fetchFacilitadores = createAsyncThunk(
  "facilitadores/fetchFacilitadores",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const FacilitadoresSlice = createSlice({
  name: "facilitadores",
  initialState: {
    facilitadores: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Caso de éxito para createFacilitador
      .addCase(registerFacilitador.fulfilled, (state, action) => {
        state.facilitadores.push(action.payload);
        state.status = "succeeded";
      })
      // Caso de fallo para createFacilitador
      .addCase(registerFacilitador.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Caso de éxito para fetchFacilitadores
      .addCase(fetchFacilitadores.fulfilled, (state, action) => {
        state.facilitadores = action.payload;
        state.status = "succeeded";
      })
      // Caso de fallo para fetchFacilitadores
      .addCase(fetchFacilitadores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default FacilitadoresSlice.reducer;
