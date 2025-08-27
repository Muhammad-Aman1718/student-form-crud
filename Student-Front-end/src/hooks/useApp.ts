import { useState } from "react";
import { Student } from "../constant/data";

const useApp = () => {
  const [students, setStudents] = useState([
    {
      id: "1",
      name: "Ahmed Ali",
      fatherName: "Muhammad Ali",
      age: "16",
      dateOfBirth: "2007-03-15",
      gender: "Male",
      grade: "10th",
      classSection: "A",
      gpa: "3.8",
      email: "ahmed.ali@email.com",
      rollNumber: "2023-001",
      phoneNumber: "03001234567",
      status: "Active",
      address: "House 123, Street 45, Lahore",
      subjects: ["Mathematics", "Physics", "Chemistry"],
    },
  ]);

  const [formData, setFormData] = useState<Student>({
    // id: "",
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);

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

  const handleSubmit = () => {
    if (editingId) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingId ? { ...formData, id: editingId } : student
        )
      );
      setEditingId(null);
    } else {
      const newStudent = {
        ...formData,
        id: students.length + 1,
        age: parseInt(formData.age) || 0,
        gpa: parseFloat(formData.gpa) || 0,
      };
      setStudents((prev) => [...prev, newStudent]);
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

  const handleEdit = (student: Student) => {
    setFormData(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter(
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
