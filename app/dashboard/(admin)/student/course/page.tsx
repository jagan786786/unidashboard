"use client";

import { useEffect, useState } from "react";
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
import { Plus, Pen, Trash } from "lucide-react";

interface Course {
  id: number | null;
  program: string;
  branch: string;
  semester: number;
  courseCode: string;
  courseName: string;
}

interface SectionMapping {
  program: string;
  branch: string;
  semester: number;
}

function ordinalSuffix(i: number): string {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) return i + "st";
  if (j === 2 && k !== 12) return i + "nd";
  if (j === 3 && k !== 13) return i + "rd";
  return i + "th";
}

export default function StudentCourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<string[]>([]);
  const [sections, setSections] = useState<SectionMapping[]>([]);
  const [selectedProgram, setSelectedProgram] = useState("");

  const [formData, setFormData] = useState<Course>({
    id: null,
    program: "",
    branch: "",
    semester: 0,
    courseCode: "",
    courseName: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/programs")
      .then((res) => res.json())
      .then(setPrograms)
      .catch(console.error);

    fetch("http://localhost:8080/api/admin/section-mappings")
      .then((res) => res.json())
      .then(setSections)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedProgram) {
      fetch(`http://localhost:8080/api/admin/program/${selectedProgram}`)
        .then((res) => res.json())
        .then(setCourses)
        .catch(console.error);
    } else {
      setCourses([]);
    }
  }, [selectedProgram]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "semester" ? parseInt(value, 10) : value,
    }));
  };

  const clearForm = () => {
    setFormData({
      id: null,
      program: "",
      branch: "",
      semester: 0,
      courseCode: "",
      courseName: "",
    });
    setIsEditMode(false);
  };

  const handleAddOrUpdateCourse = () => {
    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? `http://localhost:8080/api/admin/${formData.id}`
      : "http://localhost:8080/api/admin/courses";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Request failed: ${res.status} ${errText}`);
        }
        return res.text();
      })
      .then((text) => {
        if (selectedProgram) {
          setSelectedProgram(""); // trigger reload
          setTimeout(() => setSelectedProgram(formData.program), 0);
        }
        setIsDialogOpen(false);
        clearForm();
      })
      .catch((err) => {
        console.error("Course save failed:", err.message);
        alert("Course save failed: " + err.message); // better error UX
      });
  };

  const handleEditClick = (course: Course) => {
    setFormData(course);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    fetch(`http://localhost:8080/api/admin/${id}`, { method: "DELETE" })
      .then(() => setCourses((prev) => prev.filter((c) => c.id !== id)))
      .catch((err) => {
        console.error(err);
        alert("Delete failed: " + err.message);
      });
  };

  const groupedCourses = courses.reduce((acc, course) => {
    const key = `Branch - ${course.branch}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Course List</h2>
        <div className="flex items-center gap-4">
          <select
            className="border px-3 py-1 rounded"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="">Select Program</option>
            {programs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="flex items-center gap-2"
                onClick={() => {
                  clearForm();
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4" /> Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {isEditMode ? "Edit Course" : "Add New Course"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Program */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="program" className="text-right">
                    Program
                  </Label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="col-span-3 border px-2 py-1 rounded"
                  >
                    <option value="">Select Program</option>
                    {programs.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="branch" className="text-right">
                    Branch
                  </Label>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="col-span-3 border px-2 py-1 rounded"
                  >
                    <option value="">Select Branch</option>
                    {[
                      ...new Set(
                        sections
                          .filter((s) => s.program === formData.program)
                          .map((s) => s.branch)
                      ),
                    ].map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Semester */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">
                    Semester
                  </Label>
                  <select
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="col-span-3 border px-2 py-1 rounded"
                  >
                    <option value="">Select Semester</option>
                    {[
                      ...new Set(
                        sections
                          .filter(
                            (s) =>
                              s.program === formData.program &&
                              s.branch === formData.branch
                          )
                          .map((s) => s.semester)
                      ),
                    ].map((sem) => (
                      <option key={sem} value={sem}>
                        {ordinalSuffix(sem)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Course Code & Name */}
                {["courseCode", "courseName"].map((field) => (
                  <div
                    key={field}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label htmlFor={field} className="text-right">
                      {field === "courseCode" ? "Course Code" : "Course Name"}
                    </Label>
                    <Input
                      id={field}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                ))}

                <Button onClick={handleAddOrUpdateCourse}>
                  {isEditMode ? "Update" : "Submit"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Display Table */}
      <div className="space-y-6">
        {Object.entries(groupedCourses)
          .sort()
          .map(([branch, grouped]) => (
            <div key={branch}>
              <h3 className="font-semibold text-lg mb-2">{branch}</h3>
              <table className="w-full table-auto border text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="border px-4 py-2 text-left">
                      Program / Semester
                    </th>
                    <th className="border px-4 py-2 text-left">Course Code</th>
                    <th className="border px-4 py-2 text-left">Course Name</th>
                    <th className="border px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped.map((course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="border px-4 py-2">
                        {course.program} / {ordinalSuffix(course.semester)}{" "}
                        Semester
                      </td>
                      <td className="border px-4 py-2">{course.courseCode}</td>
                      <td className="border px-4 py-2">{course.courseName}</td>
                      <td className="border px-4 py-2 space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditClick(course)}
                        >
                          <Pen className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteClick(course.id!)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </td>
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
