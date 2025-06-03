"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ScheduleType {
  program: string;
  branch: string;
  semester: string;
  section: string;
  sectionId: number;
  courseName: string;
  day: string;
  time: string;
}

interface Student {
  rollNo: string;
  name: string;
  phone: string;
  present: boolean;
}

export default function AttendancePage() {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ScheduleType | null>(null);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openAssignment, setOpenAssignment] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [noOfClasses, setNoOfClasses] = useState(1);
  const [selectedDay, setSelectedDay] = useState("All");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const facultyId = localStorage.getItem("userid");
      if (!facultyId) return;

      try {
        const res = await fetch(
          `http://localhost:8080/api/schedules/faculty?facultyId=${facultyId}`
        );
        const data = await res.json();
        setSchedule(data);
      } catch (err) {
        console.error("Failed to fetch schedule", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const fetchStudentsBySection = async (sectionId: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/sections/${sectionId}`
      );
      if (!res.ok) throw new Error("Failed to fetch students");
      const data: { rollNo: string; name: string; phone: string }[] =
        await res.json();

      const studentsWithAttendance: Student[] = data.map((student) => ({
        ...student,
        present: false,
      }));

      setStudents(studentsWithAttendance);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const handleCheckboxChange = (index: number) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handleAttendanceSubmit = async () => {
    const facultyId = localStorage.getItem("userid");
    if (!selectedClass || !facultyId) {
      alert("Class or faculty not selected.");
      return;
    }

    const attendancePayload = students.map((student) => ({
      facultyId,
      studentRollNo: student.rollNo,
      program: selectedClass.program,
      branch: selectedClass.branch,
      semester: selectedClass.semester,
      section: selectedClass.section,
      courseName: selectedClass.courseName,
      day: selectedClass.day,
      time: selectedClass.time,
      present: student.present,
      presentCount: student.present ? noOfClasses : 0,
      noOfClasses,
      totalClasses: noOfClasses,
      date: new Date().toISOString().slice(0, 10),
    }));

    try {
      const res = await fetch("http://localhost:8080/api/attendance/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendancePayload),
      });

      if (res.ok) {
        alert("Attendance submitted successfully");
      } else {
        alert("Failed to submit attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("An error occurred while submitting attendance.");
    }

    setOpenAttendance(false);
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClass) return;

    const formData = new FormData();
    formData.append("program", selectedClass.program);
    formData.append("branch", selectedClass.branch);
    formData.append("semester", selectedClass.semester);
    formData.append("section", selectedClass.section);
    formData.append("sectionId", selectedClass.sectionId.toString());
    formData.append("subject", selectedClass.courseName);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dueDate", duedate);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch("http://localhost:8080/api/assignments/save", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", text);
        alert("Failed to submit assignment");
      } else {
        alert("Assignment submitted!");
        setOpenAssignment(false);
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      alert("An error occurred while submitting assignment.");
    }
  };

  const uniqueSchedule = Array.from(
    new Map(
      schedule.map((item) => [
        `${item.program}-${item.branch}-${item.semester}-${item.section}-${item.courseName}`,
        item,
      ])
    ).values()
  );

  const filteredSchedule =
    selectedDay === "All"
      ? uniqueSchedule
      : uniqueSchedule.filter((row) => row.day === selectedDay);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading schedule...</p>
          ) : (
            <table className="w-full text-sm table-auto border">
              <thead className="bg-muted">
                <tr>
                  <th className="border px-4 py-2">Program</th>
                  <th className="border px-4 py-2">Branch</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedule.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row.program}</td>
                    <td className="border px-4 py-2">{row.branch}</td>
                    <td className="border px-4 py-2">{row.semester}</td>
                    <td className="border px-4 py-2">{row.section}</td>
                    <td className="border px-4 py-2">{row.courseName}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <Button
                        size="sm"
                        onClick={async () => {
                          setSelectedClass({ ...row });
                          setOpenAttendance(true);
                          await fetchStudentsBySection(row.sectionId);
                        }}
                      >
                        Mark Attendance
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedClass(row);
                          setOpenAssignment(true);
                        }}
                      >
                        Assign Assignment
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Attendance Dialog */}
      <Dialog open={openAttendance} onOpenChange={setOpenAttendance}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Attendance Form</DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Info</CardTitle>
                </CardHeader>
                <CardContent>
                  {[
                    "program",
                    "branch",
                    "semester",
                    "section",
                    "courseName",
                  ].map((field) => (
                    <Input
                      key={field}
                      readOnly
                      value={(selectedClass as any)[field]}
                      className="mb-2"
                    />
                  ))}
                  <Input
                    placeholder="Day"
                    onChange={(e) =>
                      setSelectedClass((prev) =>
                        prev ? { ...prev, day: e.target.value } : prev
                      )
                    }
                    className="mb-2"
                  />
                  <Input
                    placeholder="Time"
                    onChange={(e) =>
                      setSelectedClass((prev) =>
                        prev ? { ...prev, time: e.target.value } : prev
                      )
                    }
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    min={1}
                    value={noOfClasses}
                    onChange={(e) => setNoOfClasses(Number(e.target.value))}
                    placeholder="No. of Classes"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="w-full border text-sm">
                    <thead>
                      <tr>
                        <th className="border">Roll No</th>
                        <th className="border">Name</th>
                        <th className="border">Phone</th>
                        <th className="border">Present</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.rollNo}>
                          <td className="border px-2 py-1">{student.rollNo}</td>
                          <td className="border px-2 py-1">{student.name}</td>
                          <td className="border px-2 py-1">{student.phone}</td>
                          <td className="border px-2 py-1 text-center">
                            <Checkbox
                              checked={student.present}
                              onCheckedChange={() =>
                                handleCheckboxChange(index)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    className="mt-4 w-full"
                    onClick={handleAttendanceSubmit}
                  >
                    Submit Attendance
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assignment Dialog */}
      <Dialog open={openAssignment} onOpenChange={setOpenAssignment}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Assign New Assignment</DialogTitle>
          </DialogHeader>
          <CardContent>
            <form onSubmit={handleAssignmentSubmit} className="space-y-4">
              <Input
                placeholder="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Assignment Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-6">
                <Input
                  type="date"
                  value={duedate}
                  onChange={(e) => setDuedate(e.target.value)}
                  required
                />
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
              <Button type="submit" className="w-full">
                Assign
              </Button>
            </form>
          </CardContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
