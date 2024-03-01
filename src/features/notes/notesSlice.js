import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const host = "https://mynotebookbackend-0n7e.onrender.com";

const initialState = {
  progress: 0,
  notes: [],
};

//get all notes for a user
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

// add notes
export const addNote = createAsyncThunk(
  "addNote",
  async (note, { rejectWithValue }) => {
    try {
      const response = await fetch(`${host}/api/notes/addNotes`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete the note
export const deleteNote = createAsyncThunk(
  "deleteNote",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// pin note
export const pinNotes = createAsyncThunk(
  "pinNotes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${host}/api/notes/pin/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// unpin note
export const unpinNotes = createAsyncThunk(
  "unpinNotes",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${host}/api/notes/unpin/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
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
      });

    builder
      .addCase(addNote.pending, (state) => {
        state.progress = 80;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.progress = 100;
        state.notes.push(action.payload);
        toast.success("Note Added");
      })
      .addCase(addNote.rejected, (state) => {
        state.progress = 100;
        console.log("rejected add notes");
        toast.error("something went wrong");
      });

    builder
      .addCase(deleteNote.pending, (state) => {
        state.progress = 80;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.progress = 100;
        const id = action.meta.arg;
        const newNotes = state.notes.filter((note) => {
          return note._id !== id;
        });

        state.notes.length = 0;
        state.notes = [...newNotes];
        toast.success("Note Deleted");
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.progress = 100;
        toast.error("something went wrong");
      });

    builder
      .addCase(pinNotes.pending, (state, action) => {
        const id = action.meta.arg;
        const newNotes = state.notes.map((note) => {
          if (note._id === id) {
            note.pinned = true;
          }
          return note;
        });
        state.notes.length = 0;
        state.notes = [...newNotes];
      })
      .addCase(pinNotes.fulfilled, () => {
        toast.success("Note pinned");
      })
      .addCase(pinNotes.rejected, (state, action) => {
        const id = action.meta.arg;
        const newNotes = state.notes.map((note) => {
          if (note._id === id) {
            note.pinned = false;
          }
          return note;
        });
        state.notes.length = 0;
        state.notes = [...newNotes];
        toast.error("Something went wrong");
      });

    builder
      .addCase(unpinNotes.pending, (state, action) => {
        const id = action.meta.arg;
        const newNotes = state.notes.map((note) => {
          if (note._id === id) {
            note.pinned = false;
          }
          return note;
        });
        state.notes.length = 0;
        state.notes = [...newNotes];
      })
      .addCase(unpinNotes.fulfilled, () => {
        toast.success("Note unpinned");
      })
      .addCase(unpinNotes.rejected, (state, action) => {
        const id = action.meta.arg;
        const newNotes = state.notes.map((note) => {
          if (note._id === id) {
            note.pinned = true;
          }
          return note;
        });
        state.notes.length = 0;
        state.notes = [...newNotes];
        toast.error("Something went wrong");
      });
  },
});

export default notesSlice.reducer;
