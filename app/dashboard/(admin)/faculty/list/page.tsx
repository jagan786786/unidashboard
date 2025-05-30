"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Delete, Pen, Plus } from "lucide-react";

type Faculty = {
  empId: string;
  name: string;
  email: string;
  password: string;
  department: string;
  doj: string;
  phone: string;
  nativePlace: string;
  qualification: string;
};

const BACKEND_URL = "http://localhost:8080/api/admin";

export default function FacultyListsPage() {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Faculty>({
    empId: "",
    name: "",
    email: "",
    password: "",
    department: "",
    doj: "",
    phone: "",
    nativePlace: "",
    qualification: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchFacultyData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/faculties`);
      setFacultyData(response.data);
    } catch (err) {
      setError("Failed to fetch faculty data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const validateForm = () => {
    if (
      !formData.empId.trim() ||
      !formData.name.trim() ||
      !formData.password.trim() ||
      !formData.department.trim() ||
      !formData.doj.trim()
    ) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      empId: "",
      name: "",
      email: "",
      password: "",
      department: "",
      doj: "",
      phone: "",
      nativePlace: "",
      qualification: "",
    });
    setIsEditing(false);
    setDialogOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateFaculty = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${BACKEND_URL}/faculty/${formData.empId}`, formData);
      } else {
        await axios.post(`${BACKEND_URL}/add-faculty`, formData);
      }
      await fetchFacultyData();
      resetForm();
    } catch (err) {
      alert("Failed to save faculty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFaculty = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    setLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/faculty/${id}`);
      await fetchFacultyData();
    } catch (err) {
      alert("Failed to delete faculty.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (faculty: Faculty) => {
    setFormData({ ...faculty, password: "" }); // clear password for update
    setIsEditing(true);
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Faculty List</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setDialogOpen(true);
              }}
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Faculty" : "Add Faculty"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                "empId",
                "name",
                "password",
                "department",
                "doj",
                "phone",
                "nativePlace",
                "qualification",
              ].map((field) => (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  key={field}
                >
                  <Label htmlFor={field} className="text-right capitalize">
                    {field === "doj"
                      ? "Date of Joining"
                      : field.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    value={(formData as any)[field] || ""}
                    onChange={handleChange}
                    className="col-span-3"
                    type={
                      field === "doj"
                        ? "date"
                        : field === "password"
                        ? "password"
                        : "text"
                    }
                    disabled={loading}
                  />
                </div>
              ))}
              <Button onClick={handleAddOrUpdateFaculty} disabled={loading}>
                {loading ? "Saving..." : isEditing ? "Update" : "Submit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading && !dialogOpen && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">EmpId</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Department</th>
              <th className="border px-4 py-2">DOJ</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Native Place</th>
              <th className="border px-4 py-2">Qualification</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {facultyData.map((faculty) => (
              <tr key={faculty.empId}>
                <td className="border px-4 py-2">{faculty.empId}</td>
                <td className="border px-4 py-2">{faculty.name}</td>
                <td className="border px-4 py-2">{faculty.email}</td>
                <td className="border px-4 py-2">{faculty.department}</td>
                <td className="border px-4 py-2">{faculty.doj}</td>
                <td className="border px-4 py-2">{faculty.phone}</td>
                <td className="border px-4 py-2">{faculty.nativePlace}</td>
                <td className="border px-4 py-2">{faculty.qualification}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEditClick(faculty)}>
                      <Pen className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteFaculty(faculty.empId)}
                    >
                      <Delete className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
