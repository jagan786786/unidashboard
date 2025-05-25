"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Course = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
};

export default function StudentCoursesPage() {
  const [studentCourses, setStudentCourses] = useState<Course[]>([
    {
      title: "Full Stack Bootcamp",
      description: "12-week intensive course on modern web dev stack",
      startDate: "2025-06-10",
      endDate: "2025-08-30",
      venue: "Block A, Room 302",
    },
    {
      title: "Soft Skills Training",
      description: "Improve communication, resume writing, and interviews",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      venue: "Auditorium",
    },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Student Courses & Training</h2>
      {studentCourses.length === 0 ? (
        <p className="text-muted-foreground">No courses available yet.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Active Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentCourses.map((course, idx) => (
              <div key={idx} className="border-b pb-3">
                <p className="font-semibold">{course.title}</p>
                <p className="text-sm text-muted-foreground">{course.description}</p>
                <p className="text-xs mt-1">
                  📅 {course.startDate} → {course.endDate} <br />
                  📍 {course.venue}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
