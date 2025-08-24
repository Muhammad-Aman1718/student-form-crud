import { useState } from "react";

const useApp = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      fatherName: "Muhammad Ali",
      age: 16,
      grade: "10th",
      email: "ahmed.ali@email.com",
      phone: "03001234567",
      address: "House 123, Street 45, Lahore",
      gender: "Male",
      dateOfBirth: "2007-03-15",
      class: "A",
      rollNumber: "2023-001",
      subjects: ["Mathematics", "Physics", "Chemistry"],
      gpa: 3.8,
      status: "Active",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    age: "",
    grade: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    class: "",
    rollNumber: "",
    subjects: [],
    gpa: "",
    status: "Active",
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
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
      grade: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      class: "",
      rollNumber: "",
      subjects: [],
      gpa: "",
      status: "Active",
    });
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
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
