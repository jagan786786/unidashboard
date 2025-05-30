"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await axios.get("http://localhost:8080/api/admin/departments");
    setDepartments(res.data);
  };

  const handleAddDepartment = async () => {
    if (formData.name && formData.description && formData.image) {
      await axios.post("http://localhost:8080/api/admin/departments", formData);
      setFormData({ name: "", description: "", image: "" });
      fetchDepartments();
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/admin/departments/${id}`);
    fetchDepartments();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Department</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Department Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Textarea
                placeholder="Short Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Button onClick={handleAddDepartment}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept: any) => (
          <Card key={dept.id}>
            <CardHeader className="p-0 relative">
              <Image
                src={dept.image.trim()}
                alt={dept.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleDelete(dept.id)}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{dept.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{dept.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
