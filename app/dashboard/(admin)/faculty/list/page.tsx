"use client";

import { useState } from "react";
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
import { Plus } from "lucide-react";

type Faculty = {
  id: number;
  name: string;
  department: string;
  doj: string;
  phone: string;
  nativePlace: string;
  qualification: string;
};

export default function FacultyListsPage() {
  const [facultyData, setFacultyData] = useState<Faculty[]>([
    {
      id: 1,
      name: "Dr. Anjali Sharma",
      department: "Computer Science",
      doj: "2015-08-01",
      phone: "9876543210",
      nativePlace: "Bhubaneswar",
      qualification: "PhD in AI",
    },
    {
      id: 2,
      name: "Prof. Rajesh Nair",
      department: "Mechanical Engineering",
      doj: "2012-06-15",
      phone: "9876501234",
      nativePlace: "Kochi",
      qualification: "M.Tech in Thermodynamics",
    },
    {
      id: 3,
      name: "Dr. Meena Das",
      department: "Biotechnology",
      doj: "2018-11-10",
      phone: "9898989898",
      nativePlace: "Cuttack",
      qualification: "PhD in Genetics",
    },
  ]);

  const [formData, setFormData] = useState<Faculty>({
    id: 0,
    name: "",
    department: "",
    doj: "",
    phone: "",
    nativePlace: "",
    qualification: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFaculty = () => {
    const newFaculty = { ...formData, id: Date.now() };
    setFacultyData([...facultyData, newFaculty]);
    setFormData({
      id: 0,
      name: "",
      department: "",
      doj: "",
      phone: "",
      nativePlace: "",
      qualification: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Faculty List</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Faculty
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {["name", "department", "doj", "phone", "nativePlace", "qualification"].map((field) => (
                <div className="grid grid-cols-4 items-center gap-4" key={field}>
                  <Label htmlFor={field} className="text-right capitalize">
                    {field === "doj" ? "Date of Joining" : field.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className="col-span-3"
                    type={field === "doj" ? "date" : "text"}
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddFaculty}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Department</th>
              <th className="border px-4 py-2 text-left">DOJ</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Native Place</th>
              <th className="border px-4 py-2 text-left">Qualification</th>
            </tr>
          </thead>
          <tbody>
            {facultyData.map((faculty) => (
              <tr key={faculty.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border px-4 py-2">{faculty.name}</td>
                <td className="border px-4 py-2">{faculty.department}</td>
                <td className="border px-4 py-2">{faculty.doj}</td>
                <td className="border px-4 py-2">{faculty.phone}</td>
                <td className="border px-4 py-2">{faculty.nativePlace}</td>
                <td className="border px-4 py-2">{faculty.qualification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
