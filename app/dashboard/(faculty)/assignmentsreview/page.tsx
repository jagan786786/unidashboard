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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

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
  id?: string | number;
  rollNo: string;
  name: string;
  section: string;
  subject?: string;
  submittedAt?: string | null;
  fileUrl?: string | null;
  status?: string | null;
}

export default function AssignmentPage() {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<ScheduleType | null>(null);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const router = useRouter();

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

  const fetchStudentsBySection = async (
    sectionId: number,
    courseName: string,
    sectionName: string
  ) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/student/submissions?sectionId=${sectionId}&subject=${courseName}`
      );
      if (!res.ok) throw new Error("Failed to fetch submissions");

      const data: Student[] = await res.json();
      const studentList: Student[] = data.map((student) => ({
        ...student,
        section: sectionName,
        subject: courseName,
      }));
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setStudents([]);
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Faculty Schedule</CardTitle>
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
                {uniqueSchedule.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row.program}</td>
                    <td className="border px-4 py-2">{row.branch}</td>
                    <td className="border px-4 py-2">{row.semester}</td>
                    <td className="border px-4 py-2">{row.section}</td>
                    <td className="border px-4 py-2">{row.courseName}</td>
                    <td className="border px-4 py-2">
                      <Button
                        size="sm"
                        onClick={async () => {
                          setSelectedClass(row);
                          setOpenAttendance(true);
                          await fetchStudentsBySection(
                            row.sectionId,
                            row.courseName,
                            row.section
                          );
                        }}
                      >
                        View Assignments
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Dialog open={openAttendance} onOpenChange={setOpenAttendance}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Students in Section</DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedClass.courseName} - Section {selectedClass.section}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full border text-sm">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Roll No</th>
                      <th className="border px-2 py-1">Name</th>
                      <th className="border px-2 py-1">Section</th>
                      <th className="border px-2 py-1">Submitted At</th>
                      <th className="border px-2 py-1">File</th>
                      <th className="border px-2 py-1">Status</th>
                      <th className="border px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.rollNo}>
                        <td className="border px-2 py-1">{student.rollNo}</td>
                        <td className="border px-2 py-1">{student.name}</td>
                        <td className="border px-2 py-1">{student.section}</td>
                        <td className="border px-2 py-1">
                          {student.submittedAt
                            ? new Date(student.submittedAt).toLocaleString()
                            : "Not Submitted"}
                        </td>
                        <td className="border px-2 py-1">
                          {student.fileUrl ? (
                            <a
                              href={student.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              View File
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="border px-2 py-1">
                          {student.status || "N/A"}
                        </td>
                        <td className="border px-2 py-1 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  if (student.id) {
                                    router.push(
                                      `/dashboard/assignmentsreview/${student.id}`
                                    );
                                  } else {
                                    alert("No assignment submitted yet.");
                                  }
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  if (student.fileUrl) {
                                    const link = document.createElement("a");
                                    link.href = student.fileUrl;
                                    link.download = `${student.rollNo}_assignment.pdf`;
                                    link.click();
                                  } else {
                                    alert("No file submitted");
                                  }
                                }}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
