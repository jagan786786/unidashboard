"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface StudentProfile {
  program: string;
  branch: string;
  semester: number;
}

interface Subject {
  courseCode: string;
  courseName: string;
  semester: number;
  syllabus: string;
}

export default function SubjectTable() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const rollNo = localStorage.getItem("userid");
      try {
        setLoadingProfile(true);
        const res = await fetch(
          `http://localhost:8080/api/admin/student/${rollNo}`
        );
        if (!res.ok) throw new Error("Failed to fetch student profile");
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile) return;

    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const { program, branch, semester } = profile;
        const semesterNumber =
          typeof semester === "number"
            ? semester
            : parseInt(String(semester).replace(/\D/g, ""), 10);

        const res = await fetch(
          `http://localhost:8080/api/admin/studentcourses?program=${encodeURIComponent(
            program
          )}&branch=${encodeURIComponent(branch)}&semester=${semesterNumber}`
        );
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setSubjects(data);
      } catch (err: any) {
        setError(err.message || "Error fetching courses");
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [profile]);

  if (loadingProfile) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>📚 Registered Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingCourses ? (
            <p>Loading courses...</p>
          ) : subjects.length === 0 ? (
            <p>No courses found for the student.</p>
          ) : (
            <div className="overflow-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-gray-100 dark:bg-gray-800">
                  <TableRow>
                    <TableHead>Subject Code</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Syllabus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subj, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{subj.courseCode}</TableCell>
                      <TableCell>{subj.courseName}</TableCell>
                      <TableCell>{subj.semester}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">View</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Syllabus: {subj.courseName}</DialogTitle>
                            </DialogHeader>
                            <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto">
                              {subj.syllabus ? (
                                <p>{subj.syllabus}</p>
                              ) : (
                                <p>No syllabus available.</p>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
