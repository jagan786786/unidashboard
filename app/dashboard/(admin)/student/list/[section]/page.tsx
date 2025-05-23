"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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
  name: string;
  email: string;
  department: string;
  doj: string;
  phone: string;
  nativePlace: string;
  about: string;
};

export default function StudentListPage() {
  const { section } = useParams();

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@example.com",
      department: "Computer Science",
      doj: "2022-08-15",
      phone: "9876543210",
      nativePlace: "Delhi",
      about: "Top performing student",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [newStudent, setNewStudent] = useState<
    Omit<Student, "id"> & { password: string }
  >({
    name: "",
    email: "",
    password: "",
    department: "",
    doj: "",
    phone: "",
    nativePlace: "",
    about: "",
  });

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = () => {
    const id = Date.now();
    const { password, ...studentData } = newStudent; // Password usage depends on auth setup
    setStudents([...students, { id, ...studentData }]);
    setNewStudent({
      name: "",
      email: "",
      password: "",
      department: "",
      doj: "",
      phone: "",
      nativePlace: "",
      about: "",
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent({ ...student });
    setIsEditModalOpen(true);
  };

  const handleEditStudentSave = () => {
    if (!editingStudent) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === editingStudent.id ? editingStudent : s))
    );
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Students - Section {section}</h2>

        {/* Add Student Modal */}
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
              <Input
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
              />
              <Input
                placeholder="Password"
                type="password"
                value={newStudent.password}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, password: e.target.value })
                }
              />
              <Input
                placeholder="Department"
                value={newStudent.department}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, department: e.target.value })
                }
              />
              <Input
                placeholder="Date of Joining"
                type="date"
                value={newStudent.doj}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, doj: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={newStudent.phone}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, phone: e.target.value })
                }
              />
              <Input
                placeholder="Native Place"
                value={newStudent.nativePlace}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    nativePlace: e.target.value,
                  })
                }
              />
              <Input
                placeholder="About"
                value={newStudent.about}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, about: e.target.value })
                }
              />
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
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.department}</td>
                <td className="border px-4 py-2">{student.doj}</td>
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
              <Input
                placeholder="Name"
                value={editingStudent.name}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, name: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={editingStudent.email}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    email: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Department"
                value={editingStudent.department}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    department: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Date of Joining"
                type="date"
                value={editingStudent.doj}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    doj: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Phone"
                value={editingStudent.phone}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    phone: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Native Place"
                value={editingStudent.nativePlace}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    nativePlace: e.target.value,
                  })
                }
              />
              <Input
                placeholder="About"
                value={editingStudent.about}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    about: e.target.value,
                  })
                }
              />
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
