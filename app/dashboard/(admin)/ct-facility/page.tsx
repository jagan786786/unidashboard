"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type Course = {
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

  const handleAddCourse = () => {
    const newCourse: Course = { ...form };

    if (form.type === "student") {
      setStudentCourses([...studentCourses, newCourse]);
    } else {
      setFacultyCourses([...facultyCourses, newCourse]);
    }

    setForm({
      title: "",
      description: "",
      type: "student",
      startDate: "",
      endDate: "",
      venue: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courses & Training</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
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
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Course Description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
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
              <Button onClick={handleAddCourse} className="w-full">
                Add Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
              {studentCourses.map((course, idx) => (
                <div key={idx} className="border-b pb-3">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <p className="text-xs mt-1">
                    📅 {course.startDate} → {course.endDate} <br />
                    📍 {course.venue}
                  </p>
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
              {facultyCourses.map((course, idx) => (
                <div key={idx} className="border-b pb-3">
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <p className="text-xs mt-1">
                     {course.startDate} → {course.endDate} <br />
                     {course.venue}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
