"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Delete, Pen, Plus } from "lucide-react";

type Student = {
  id: number;
  rollNo: string;
  name: string;
  email: string;
  department: string;
  dateOfJoining: string; // "yyyy-MM-dd"
  phone: string;
  nativePlace: string;
  about: string;
};

type StudentRequest = Omit<Student, "id"> & { password?: string };

export default function StudentListPage() {
  const [section, setSection] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Convert "2023-08-01" => "01-08-2023"
  function formatDateToDDMMYYYY(dateStr: string | null): string {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  }

  const [newStudent, setNewStudent] = useState<StudentRequest>({
    rollNo: "",
    name: "",
    email: "",
    password: "",
    department: "",
    dateOfJoining: "",
    phone: "",
    nativePlace: "",
    about: "",
  });

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const extractedSection = pathSegments[pathSegments.length - 1];
    setSection(extractedSection);
  }, []);

  const fetchStudents = async () => {
    if (!section) return;
    const res = await fetch(
      `http://localhost:8080/api/admin/section/${section}`
    );
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    if (section) fetchStudents();
  }, [section]);

  const handleAddStudent = async () => {
    const payload = {
      ...newStudent,
      sectionId: Number(section),
    
    };

    const res = await fetch("http://localhost:8080/api/admin/add-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      fetchStudents();
      setIsAddModalOpen(false);
      setNewStudent({
        rollNo: "",
        name: "",
        email: "",
        password: "",
        department: "",
        dateOfJoining: "",
        phone: "",
        nativePlace: "",
        about: "",
      });
    } else {
      alert("Failed to add student");
    }
  };

  const handleEditStudentSave = async () => {
    if (!editingStudent) return;
    const payload = {
      ...editingStudent,
      sectionId: Number(section),
    
    };

    const res = await fetch(
      `http://localhost:8080/api/admin/student/${editingStudent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      fetchStudents();
      setIsEditModalOpen(false);
      setEditingStudent(null);
    } else {
      alert("Failed to update student");
    }
  };

  const handleDeleteStudent = async (id: number) => {
    const res = await fetch(`http://localhost:8080/api/admin/student/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchStudents();
    } else {
      alert("Failed to delete student");
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Students - Section {section}</h2>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex gap-2">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              {[
                { field: "rollNo", label: "Roll Number" },
                { field: "name", label: "Name" },
                { field: "email", label: "Email" },
                { field: "password", label: "Password" },
                { field: "department", label: "Department" },
                { field: "dateOfJoining", label: "Date of Joining" },
                { field: "phone", label: "Phone" },
                { field: "nativePlace", label: "Native Place" },
                { field: "about", label: "About" },
              ].map(({ field, label }) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium block">{label}</label>
                  <Input
                    type={
                      field === "password"
                        ? "password"
                        : field === "dateOfJoining"
                        ? "date"
                        : "text"
                    }
                    value={(newStudent as any)[field] || ""}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
              <Button className="w-full" onClick={handleAddStudent}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="border px-4 py-2">RollNo</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">DOJ</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Native Place</th>
              <th className="border px-4 py-2">About</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border px-4 py-2">{student.rollNo}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.department}</td>
                <td className="border px-4 py-2">
                  {student.dateOfJoining
                    ? formatDateToDDMMYYYY(student.dateOfJoining)
                    : "—"}
                </td>

                <td className="border px-4 py-2">{student.phone}</td>
                <td className="border px-4 py-2">{student.nativePlace}</td>
                <td className="border px-4 py-2">{student.about}</td>
                <td className="border px-4 py-2 space-x-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" onClick={() => handleEditClick(student)}>
                      <Pen />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Student Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          {editingStudent && (
            <div className="space-y-3 mt-4">
              {[
                { field: "rollNo", label: "Roll Number" },
                { field: "name", label: "Name" },
                { field: "email", label: "Email" },
                { field: "department", label: "Department" },
                { field: "dateOfJoining", label: "Date of Joining" },
                { field: "phone", label: "Phone" },
                { field: "nativePlace", label: "Native Place" },
                { field: "about", label: "About" },
              ].map(({ field, label }) => (
                <div key={field} className="space-y-1">
                  <label className="text-sm font-medium block">{label}</label>
                  <Input
                    type={field === "dateOfJoining" ? "date" : "text"}
                    value={(editingStudent as any)[field] || ""}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        [field]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
              <Button className="w-full" onClick={handleEditStudentSave}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
