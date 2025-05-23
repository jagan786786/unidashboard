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

type Course = {
  id: number;
  program: string;
  branch: string;
  semester: number;
  courseCode: string;
  courseName: string;
};

export default function FacultyCourseListPage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      program: "B.Tech",
      branch: "Computer Science",
      semester: 3,
      courseCode: "CS301",
      courseName: "Data Structures",
    },
    {
      id: 2,
      program: "B.Tech",
      branch: "Computer Science",
      semester: 3,
      courseCode: "CS302",
      courseName: "Operating Systems",
    },
    {
      id: 3,
      program: "B.Tech",
      branch: "Mechanical Engineering",
      semester: 4,
      courseCode: "ME401",
      courseName: "Thermodynamics",
    },
  ]);

  const [formData, setFormData] = useState<Course>({
    id: 0,
    program: "",
    branch: "",
    semester: 1,
    courseCode: "",
    courseName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "semester" ? Number(value) : value,
    });
  };

  const handleAddCourse = () => {
    const newCourse = { ...formData, id: Date.now() };
    setCourses([...courses, newCourse]);
    setFormData({
      id: 0,
      program: "",
      branch: "",
      semester: 1,
      courseCode: "",
      courseName: "",
    });
  };

  // Group courses by semester
  const groupedCourses = courses.reduce((acc, course) => {
    const key = `Semester ${course.semester}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Course List</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { label: "Program", name: "program" },
                { label: "Branch", name: "branch" },
                { label: "Semester", name: "semester", type: "number" },
                { label: "Course Code", name: "courseCode" },
                { label: "Course Name", name: "courseName" },
              ].map(({ label, name, type = "text" }) => (
                <div className="grid grid-cols-4 items-center gap-4" key={name}>
                  <Label htmlFor={name} className="text-right">
                    {label}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              ))}
              <Button onClick={handleAddCourse}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedCourses).map(([semester, groupCourses]) => (
          <div key={semester}>
            <h3 className="font-semibold text-lg mb-2">{semester}</h3>
            <table className="w-full table-auto border text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border px-4 py-2 text-left">
                    Program / Branch
                  </th>
                  <th className="border px-4 py-2 text-left">Course Code</th>
                  <th className="border px-4 py-2 text-left">Course Name</th>
                </tr>
              </thead>
              <tbody>
                {groupCourses.map((course) => (
                  <tr
                    key={course.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="border px-4 py-2">
                      {course.program} / {course.branch}
                    </td>
                    <td className="border px-4 py-2">{course.courseCode}</td>
                    <td className="border px-4 py-2">{course.courseName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
