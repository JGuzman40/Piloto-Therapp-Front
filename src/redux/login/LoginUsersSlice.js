import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Crear un thunk para manejar el inicio de sesión
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/therapp/login", {
        email,
        password,
      });
      return response.data.user; // Devuelve el usuario si la respuesta es exitosa
    } catch (error) {
      // Maneja el error y devuelve un mensaje
      return rejectWithValue(error.response.data.message);
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Restablece el usuario a null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
