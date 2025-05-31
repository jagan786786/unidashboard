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

const daysOfWeek = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AttendancePage() {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ScheduleType | null>(null);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [noOfClasses, setNoOfClasses] = useState(1);
  const [selectedDay, setSelectedDay] = useState("All");

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

  useEffect(() => {
    if (!open) {
      setStudents([]);
      setSelectedClass(null);
    }
  }, [open]);

  const handleCheckboxChange = (index: number) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handleSubmit = async () => {
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
      noOfClasses: noOfClasses,
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

    setOpen(false);
  };

  // Filter schedule by selected day (if not "All")
  const filteredSchedule =
    selectedDay === "All"
      ? schedule
      : schedule.filter((row) => row.day === selectedDay);

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
            <>
              <div className="mb-4">
                <label
                  htmlFor="dayFilter"
                  className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                >
                  Filter by Day:
                </label>
                <select
                  id="dayFilter"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm border border-gray-300 dark:border-gray-700">
                  <thead className="bg-muted text-left dark:bg-gray-800 dark:text-gray-200">
                    <tr>
                      <th className="border px-4 py-2">Program</th>
                      <th className="border px-4 py-2">Branch</th>
                      <th className="border px-4 py-2">Semester</th>
                      <th className="border px-4 py-2">Section</th>
                      <th className="border px-4 py-2">Subject</th>
                      <th className="border px-4 py-2">Day</th>
                      <th className="border px-4 py-2">Time</th>
                      <th className="border px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedule.map((row, index) => (
                      <tr
                        key={index}
                        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      >
                        <td className="border px-4 py-2">{row.program}</td>
                        <td className="border px-4 py-2">{row.branch}</td>
                        <td className="border px-4 py-2">{row.semester}</td>
                        <td className="border px-4 py-2">{row.section}</td>
                        <td className="border px-4 py-2">{row.courseName}</td>
                        <td className="border px-4 py-2">{row.day}</td>
                        <td className="border px-4 py-2">{row.time}</td>
                        <td className="border px-4 py-2">
                          <Button
                            size="sm"
                            onClick={async () => {
                              setSelectedClass(row);
                              setOpen(true);
                              await fetchStudentsBySection(row.sectionId);
                            }}
                          >
                            Mark Attendance
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {filteredSchedule.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-gray-500 dark:text-gray-400"
                        >
                          No classes found for selected day.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Rest of your Dialog and attendance form remains unchanged */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>Attendance Form</DialogTitle>
          </DialogHeader>

          {selectedClass && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Class Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    "program",
                    "branch",
                    "semester",
                    "section",
                    "courseName",
                    "day",
                    "time",
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {field}
                      </label>
                      <input
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={(selectedClass as any)[field]}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      No. of Classes
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      onChange={(e) =>
                        setNoOfClasses(Math.max(1, Number(e.target.value)))
                      }
                      defaultValue={noOfClasses}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-[300px]">
                    <table className="w-full text-sm table-auto border border-gray-300 dark:border-gray-700">
                      <thead className="bg-muted dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-2 py-1 border">Roll No</th>
                          <th className="px-2 py-1 border">Name</th>
                          <th className="px-2 py-1 border">Phone</th>
                          <th className="px-2 py-1 border">Present</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => (
                          <tr
                            key={student.rollNo}
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          >
                            <td className="border px-2 py-1">
                              {student.rollNo}
                            </td>
                            <td className="border px-2 py-1">{student.name}</td>
                            <td className="border px-2 py-1">
                              {student.phone}
                            </td>
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
                  </div>
                  <Button className="mt-4 w-full" onClick={handleSubmit}>
                    Submit Attendance
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
