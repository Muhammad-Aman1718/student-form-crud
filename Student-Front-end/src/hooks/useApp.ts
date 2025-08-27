import { useState, useEffect } from "react";
import type { Student } from "../types/types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import {
  deleteStudent,
  fetchStudents,
  postStudents,
  updateStudent,
} from "../store/slices/student";
import { showToast } from "../utils/showToast";

const useApp = () => {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  const students = useAppSelector((state) => state.student);
  const [formData, setFormData] = useState<Student>({
    name: "",
    fatherName: "",
    age: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    classSection: "",
    gpa: "",
    email: "",
    rollNumber: "",
    phoneNumber: "",
    status: "Active",
    address: "",
    subjects: [],
  });

  useEffect(() => {
    try {
      dispatch(fetchStudents());
    } catch (error) {}
  }, [reload, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s: string) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSubmit = async () => {
    if (editingId) {
      await dispatch(updateStudent(formData));
      showToast("success", "Student updated successfully");
      setEditingId(null);
      setReload((prev) => !prev);
    } else {
      await dispatch(postStudents(formData));
      showToast("success", "Student added successfully");
      setReload((prev) => !prev);
    }

    setFormData({
      name: "",
      fatherName: "",
      age: "",
      dateOfBirth: "",
      gender: "",
      grade: "",
      classSection: "",
      gpa: "",
      email: "",
      rollNumber: "",
      phoneNumber: "",
      status: "Active",
      address: "",
      subjects: [],
    });
    setShowForm(false);
  };

  const handleEdit = (id: string) => {
    setFormData(
      students.student.find((student) => student.id === id) || formData
    );
    setEditingId(id);
    setShowForm(true);
    setReload((prev) => !prev);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteStudent(id));
    setReload((prev) => !prev);
    showToast("success", "Student deleted successfully");
  };

  const filteredStudents = students.student.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    students,
    formData,
    editingId,
    searchTerm,
    showForm,
    filteredStudents,
    handleInputChange,
    handleSubjectChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    setSearchTerm,
    setShowForm,
    setEditingId,
    setFormData,
  };
};

export default useApp;
