import { useState, useEffect } from "react";
import type { Student } from "../types/types";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { fetchStudents, postStudents } from "../store/slices/student";

const useApp = () => {
  const dispatch = useAppDispatch();

  const students = useAppSelector((state) => state.student);
  console.log("this is students===> ", students);

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

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      dispatch(fetchStudents());
    } catch (error) {}
  }, []);

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

  // const handleSubmit = () => {
  //   if (editingId) {
  //     setStudents((prev) =>
  //       prev.map((student) =>
  //         student.id === editingId ? { ...formData, id: editingId } : student
  //       )
  //     );
  //     setEditingId(null);
  //   } else {
  //     const newStudent = {
  //       ...formData,
  //     };
  //     setStudents((prev) => [...prev, newStudent]);
  //   }

  //   setFormData({
  //     name: "",
  //     fatherName: "",
  //     age: "",
  //     dateOfBirth: "",
  //     gender: "",
  //     grade: "",
  //     classSection: "",
  //     gpa: "",
  //     email: "",
  //     rollNumber: "",
  //     phoneNumber: "",
  //     status: "Active",
  //     address: "",
  //     subjects: [],
  //   });
  //   setShowForm(false);
  // };

  // const handleEdit = (student: Student) => {
  //   setFormData(student);
  //   setEditingId(student.id);
  //   setShowForm(true);
  // };

  // const handleDelete = (id: string) => {
  //   setStudents((prev) => prev.filter((student) => student.id !== id));
  // };

  const handleSubmit = () => {
    console.log("Submitting form data:", formData);

    dispatch(postStudents(formData));
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
    // handleSubmit,
    // handleEdit,
    // handleDelete,
    setSearchTerm,
    setShowForm,
    setEditingId,
    setFormData,
  };
};

export default useApp;
