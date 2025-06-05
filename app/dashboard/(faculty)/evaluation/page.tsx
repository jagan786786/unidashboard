"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Calendar,
  FileText,
  Loader2,
  Upload,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

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
  marks?: number;
}

export default function EvaluationPage() {
  const [schedule, setSchedule] = useState<ScheduleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<ScheduleType | null>(null);
  const [openMarksDialog, setOpenMarksDialog] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [maxMarks, setMaxMarks] = useState(30);
  const [examType, setExamType] = useState("Cycle Test 1");

  useEffect(() => {
    const fetchSchedule = async () => {
      const facultyId = localStorage.getItem("userid");
      if (!facultyId) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/schedules/faculty?facultyId=${facultyId}`
        );

        if (!res.ok) throw new Error("Failed to fetch schedule");

        const data = await res.json();
        setSchedule(data);
      } catch (err) {
        console.error("Failed to fetch schedule", err);
        setError("Failed to load schedule. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const fetchStudentsBySection = async (sectionId: number) => {
    try {
      setStudents([]);
      const res = await fetch(
        `http://localhost:8080/api/admin/sections/${sectionId}`
      );

      if (!res.ok) throw new Error("Failed to fetch students");

      const data: { rollNo: string; name: string; phone: string }[] =
        await res.json();

      const studentsWithMarks: Student[] = data.map((student) => ({
        ...student,
        present: true,
        marks: undefined,
      }));

      setStudents(studentsWithMarks);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const handleMarksChange = (index: number, value: string) => {
    const marks = Number.parseInt(value) || 0;
    const updated = [...students];
    updated[index].marks = marks > maxMarks ? maxMarks : marks;
    setStudents(updated);
  };

  const handleSubmitMarks = async () => {
    if (!selectedClass) return;
    setSubmitting(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/marks/upload?courseName=${encodeURIComponent(
          selectedClass.courseName
        )}&program=${encodeURIComponent(
          selectedClass.program
        )}&branch=${encodeURIComponent(
          selectedClass.branch
        )}&semester=${parseInt(
          selectedClass.semester
        )}&examType=${encodeURIComponent(examType)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            students.map((student) => ({
              rollNo: student.rollNo,
              marks: student.marks ?? 0,
            }))
          ),
        }
      );

      if (!res.ok) throw new Error("Failed to upload marks");

      const message = await res.text();
      alert(message);
      setOpenMarksDialog(false);
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("Failed to upload marks. Please try again.");
    } finally {
      setSubmitting(false);
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Evaluation Management
          </h1>
          <p className="text-muted-foreground">
            Upload and manage student evaluations and marks
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Class Schedule
          </CardTitle>
          <CardDescription>
            Select a class to upload marks or evaluations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 text-left">
                      <th className="px-4 py-3 font-medium">Program</th>
                      <th className="px-4 py-3 font-medium">Branch</th>
                      <th className="px-4 py-3 font-medium">Semester</th>
                      <th className="px-4 py-3 font-medium">Section</th>
                      <th className="px-4 py-3 font-medium">Subject</th>
                      <th className="px-4 py-3 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {uniqueSchedule.map((row, index) => (
                      <tr key={index} className="hover:bg-muted/30">
                        <td className="px-4 py-3">{row.program}</td>
                        <td className="px-4 py-3">{row.branch}</td>
                        <td className="px-4 py-3">{row.semester}</td>
                        <td className="px-4 py-3">{row.section}</td>
                        <td className="px-4 py-3">{row.courseName}</td>
                        <td className="px-4 py-3 text-right">
                          <Button
                            size="sm"
                            variant="default"
                            className="gap-1"
                            onClick={async () => {
                              setSelectedClass({ ...row });
                              await fetchStudentsBySection(row.sectionId);
                              setOpenMarksDialog(true);
                            }}
                          >
                            <Upload className="h-4 w-4" />
                            <span className="hidden sm:inline">
                              Upload Marks
                            </span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openMarksDialog} onOpenChange={setOpenMarksDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload Evaluation Marks
            </DialogTitle>
            <DialogDescription>
              Provide marks for students in the selected class.
            </DialogDescription>
            {selectedClass && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{selectedClass.program}</Badge>
                  <Badge variant="outline">{selectedClass.branch}</Badge>
                  <Badge variant="outline">
                    Semester {selectedClass.semester}
                  </Badge>
                  <Badge variant="outline">
                    Section {selectedClass.section}
                  </Badge>
                  <Badge variant="secondary">{selectedClass.courseName}</Badge>
                </div>
                <div className="w-full sm:w-auto">
                  <label className="block text-sm font-medium mb-1">
                    Exam Type
                  </label>
                  <select
                    className="border border-input rounded-md px-3 py-2 text-sm w-full"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                  >
                    <option>Cycle Test 1</option>
                    <option>Cycle Test 2</option>
                    <option>Mid Term</option>
                    <option>Final Exam</option>
                  </select>
                </div>
              </div>
            )}
          </DialogHeader>

          {selectedClass && (
            <Tabs defaultValue="marks" className="w-full">
              <TabsList className="grid grid-cols-1 mb-4">
                <TabsTrigger value="marks">Student Marks</TabsTrigger>
              </TabsList>
              <TabsContent value="marks">
                <div className="rounded-md border overflow-hidden">
                  {students.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-4 text-lg font-semibold">
                        No students found
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        There are no students enrolled in this section
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/50 text-left">
                            <th className="px-4 py-3 font-medium">Roll No</th>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium text-center">
                              Marks (out of {maxMarks})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {students.map((student, index) => (
                            <tr
                              key={student.rollNo}
                              className="hover:bg-muted/30"
                            >
                              <td className="px-4 py-3">{student.rollNo}</td>
                              <td className="px-4 py-3">{student.name}</td>
                              <td className="px-4 py-3 text-center">
                                <Input
                                  type="number"
                                  min="0"
                                  max={maxMarks}
                                  value={student.marks ?? ""}
                                  onChange={(e) =>
                                    handleMarksChange(index, e.target.value)
                                  }
                                  className="w-24 mx-auto text-center"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpenMarksDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitMarks} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Marks"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
