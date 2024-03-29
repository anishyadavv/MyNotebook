import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import notesSlice from "../features/notes/notesSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    notes: notesSlice,
  },
});
