import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosIntance from "../../utils/AxiosIntance";
import type { Student, StudentState } from "../../types/types";

const initialState: StudentState = {
  student: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    try {
      const response = await AxiosIntance.get("/students");
      console.log("this is slice response ====> :", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  }
);
export const postStudents = createAsyncThunk(
  "student/postStudents",
  async (studentData: Student) => {
    try {
      const response = await AxiosIntance.post("/students", studentData);
      console.log("this is slice response ====> :", response);

      return response.data;
    } catch (error) {
      console.error("Error posting students:", error);
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (studentData: Student) => {
    try {
      const response = await AxiosIntance.put(
        `/students/${studentData.id}`,
        studentData
      );
      console.log("this is slice response ====> :", response);

      return response.data;
    } catch (error) {
      console.error("Error updating students:", error);
      throw error;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id: string) => {
    try {
      const response = await AxiosIntance.delete(`/students/${id}`);
      console.log("this is delete response =====> ", response);

      return response.data;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
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
