import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosIntance from "../../utils/AxiosIntance";
import type { Student, StudentState } from "../../types/types";
import { showToast } from "../../utils/showToast";
import { AxiosError } from "axios";

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
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      showToast("error", `Failed to fetch students ${errorAxios.message}`);
      throw error;
    }
  }
);
export const postStudents = createAsyncThunk(
  "student/postStudents",
  async (studentData: Student) => {
    try {
      const response = await AxiosIntance.post("/students", studentData);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      showToast("error", `Failed to post students ${errorAxios.message}`);
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
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      showToast("error", `Failed to update students ${errorAxios.message}`);
      throw error;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id: string) => {
    try {
      const response = await AxiosIntance.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      const errorAxios = error as AxiosError;
      showToast("error", `Failed to delete student ${errorAxios.message}`);
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
