"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const API_BASE = "http://localhost:8080/api/admin/Training";

type Course = {
  id?: number;
  title: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  venue: string;
};

export default function CoursesTrainingPage() {
  const [studentCourses, setStudentCourses] = useState<Course[]>([]);
  const [facultyCourses, setFacultyCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<Course>({
    title: "",
    description: "",
    type: "student",
    startDate: "",
    endDate: "",
    venue: "",
  });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchCourses("student");
    fetchCourses("faculty");
  }, []);

  const fetchCourses = async (type: "student" | "faculty") => {
    const res = await fetch(`${API_BASE}/${type === "student" ? "students" : "faculties"}?page=0&size=10`);
    const data = await res.json();
    if (type === "student") setStudentCourses(data.content);
    else setFacultyCourses(data.content);
  };

  const handleAddOrUpdateCourse = async () => {
    const method = selectedCourse?.id ? "PUT" : "POST";
    const endpoint = selectedCourse?.id ? `${API_BASE}/${selectedCourse.id}` : API_BASE;

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const savedCourse = await res.json();
    fetchCourses(savedCourse.type);

    setForm({
      title: "",
      description: "",
      type: "student",
      startDate: "",
      endDate: "",
      venue: "",
    });
    setSelectedCourse(null);
    setDialogOpen(false);
  };

  const handleDeleteCourse = async (id: number, type: string) => {
    await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    fetchCourses(type as "student" | "faculty");
  };

  const openEditDialog = (course: Course) => {
    setForm(course);
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setForm({
      title: "",
      description: "",
      type: "student",
      startDate: "",
      endDate: "",
      venue: "",
    });
    setSelectedCourse(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses & Training</h2>
        <Button onClick={openAddDialog}>Add Course</Button>
      </div>

      {/* Modal (Dialog) */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>User Type</Label>
              <select
                className="w-full border p-2 rounded-md"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Course Title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Course Description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Venue</Label>
              <Input
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="Location or platform"
              />
            </div>
            <Button onClick={handleAddOrUpdateCourse} className="w-full">
              {selectedCourse ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="faculties">Faculties</TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Training Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentCourses.map((course) => (
                <div key={course.id} className="border-b pb-3">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  <p className="text-xs mt-1">
                    📅 {course.startDate} → {course.endDate} <br />
                    📍 {course.venue}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => openEditDialog(course)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCourse(course.id!, "student")}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faculties">
          <Card>
            <CardHeader>
              <CardTitle>Faculty Development Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {facultyCourses.map((course) => (
                <div key={course.id} className="border-b pb-3">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  <p className="text-xs mt-1">
                    📅 {course.startDate} → {course.endDate} <br />
                    📍 {course.venue}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => openEditDialog(course)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteCourse(course.id!, "faculty")}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
