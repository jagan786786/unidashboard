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

  // Helper: get JWT token from localStorage (adjust as needed)
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // or your key name
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  };

  // Fetch all faculty on mount
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

  // Form validation: simple example (expand as needed)
  const validateForm = () => {
    if (
      !formData.empId.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.department.trim() ||
      !formData.doj.trim()
    ) {
      alert(
        "Please fill in all required fields (empId, name, email, password, department, doj)."
      );
      return false;
    }
    // Add more validations if needed
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

  // Add or Update faculty
  const handleAddOrUpdateFaculty = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditing) {
        // Update
        await axios.put(`${BACKEND_URL}/faculty/${formData.empId}`, formData);
      } else {
        // Add
        await axios.post(
          `${BACKEND_URL}/add-faculty`,
          formData,
          
        );
      }
      await fetchFacultyData();
      resetForm();
    } catch (err) {
      alert("Failed to save faculty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete faculty
  const handleDeleteFaculty = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/faculty/${id}`);
      await fetchFacultyData();
    } catch (err) {
      alert("Failed to delete faculty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Edit click handler
  const handleEditClick = (faculty: Faculty) => {
    setFormData(faculty);
    setIsEditing(true);
    setDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Faculty List</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="flex items-center gap-2"
              onClick={() => {
                resetForm();
                setDialogOpen(true);
              }}
              disabled={loading}
            >
              <Plus className="h-4 w-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Faculty" : "Add New Faculty"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                "empId",
                "name",
                "email",
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
                    value={(formData as any)[field]}
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
              <Button
                type="button"
                onClick={handleAddOrUpdateFaculty}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Faculty"
                  : "Submit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading && !dialogOpen && (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      )}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="border px-4 py-2 text-left">EmpId</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Department</th>
                <th className="border px-4 py-2 text-left">DOJ</th>
                <th className="border px-4 py-2 text-left">Phone</th>
                <th className="border px-4 py-2 text-left">Native Place</th>
                <th className="border px-4 py-2 text-left">Qualification</th>
                <th className="border px-4 py-2 text-left">Actions</th>
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
                  <td className="border px-4 py-2 space-x-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEditClick(faculty)}
                        disabled={loading}
                      >
                        <Pen />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteFaculty(faculty.empId)}
                        disabled={loading}
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
      )}
    </div>
  );
}
