import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { StudentState } from "../../constant/data";
import AxiosIntance from "../../utils/AxiosIntance";

const initialState: StudentState = {
  student: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const response = await AxiosIntance.get("/students");
    console.log("this is slice response ====> :", response);

    return response.data;
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Define extra reducers if needed
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch students";
      });
  },
});

export default studentSlice.reducer;
