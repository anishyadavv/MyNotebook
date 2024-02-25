import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "https://mynotebookbackend-0n7e.onrender.com";
const initialState = {
  progress: 0,
  notes: [],
};
export const getNotes = createAsyncThunk("getNotes", async () => {
  const response = await fetch(`${host}/api/notes/fetchAllnotes`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  const json = await response.json();
  return json;
});

export const addNote = createAsyncThunk(
  "addNote",
  async (note, { rejectWithValue }) => {
    console.log(note);
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });
    try {
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.progress = 90;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.progress = 100;
      })
      .addCase(getNotes.rejected, (state) => {
        state.progress = 100;
        console.log("rejected get notes request");
      })
      .addCase(addNote.pending, (state) => (state.progress = 80))
      .addCase(addNote.fulfilled, (state, action) => {
        state.progress = 100;
        console.log("fullfilled");
      })
      .addCase(addNote.rejected, (state) => {
        state.progress = 100;
        console.log("rejected add notes");
      });
  },
});

export default notesSlice.reducer;
