import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "https://mynotebookbackend-0n7e.onrender.com";
const initialState = {
    name: "",
    email: "",
};

export const getUserData = createAsyncThunk("getUserData", async () => {
  const response = await fetch(`${host}/api/auth/getuser`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  const json = await response.json();
  return json;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData:(state)=>{
        state.name = "";
        state.email = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    });
  },
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
