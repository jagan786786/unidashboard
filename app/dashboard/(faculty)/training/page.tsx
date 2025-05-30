"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Course = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
};

export default function FacultyCoursesPage() {
  const [facultyCourses, setFacultyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/admin/Training/faculties"
        );
        const data = await res.json();
        setFacultyCourses(data.content); // because the API returns a Page object
      } catch (err) {
        console.error("Failed to fetch faculty trainings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyCourses();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Faculty Courses & Training</h2>

      {loading ? (
        <p>Loading...</p>
      ) : facultyCourses.length === 0 ? (
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
      )}
    </div>
  );
}
