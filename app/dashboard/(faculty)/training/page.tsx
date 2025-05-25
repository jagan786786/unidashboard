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

export default function FacultyCoursesPage() {
  const [facultyCourses, setFacultyCourses] = useState<Course[]>([
    {
      title: "AI in Education",
      description: "Workshop on AI tools for improving teaching methodology",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      venue: "Faculty Training Hall",
    },
    {
      title: "UGC Research Methodology",
      description: "Mandatory FDP program for all faculty",
      startDate: "2025-07-01",
      endDate: "2025-07-10",
      venue: "Online (Zoom)",
    },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Faculty Courses & Training</h2>
      {facultyCourses.length === 0 ? (
        <p className="text-muted-foreground">No trainings available yet.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Faculty Trainings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {facultyCourses.map((course, idx) => (
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
