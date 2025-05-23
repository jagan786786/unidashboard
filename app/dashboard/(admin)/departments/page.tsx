"use client";

import { useState } from "react";
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
import { Plus } from "lucide-react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([
    {
      name: "Computer Science",
      description: "Focuses on AI, data science, software development, and systems.",
      image: "/cse.jpg",
    },
    {
      name: "Mechanical Engineering",
      description: "Covers thermodynamics, robotics, CAD, and manufacturing systems.",
      image: "/images/mech.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleAddDepartment = () => {
    if (formData.name && formData.description && formData.image) {
      setDepartments([...departments, formData]);
      setFormData({ name: "", description: "", image: "" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Dialog>
          <DialogTrigger asChild>
           <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Departments
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
        {departments.map((dept, index) => (
          <Card key={index}>
            <CardHeader className="p-0">
              <Image
                src={dept.image}
                alt={dept.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
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
