"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Course = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
};

export default function FacultyCoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [showPastCourses, setShowPastCourses] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyCourses = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/Training?type=faculty&page=0&size=50");
        const data = await res.json();
        setAllCourses(data.content);
      } catch (err) {
        console.error("Failed to fetch faculty trainings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyCourses();
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    return showPastCourses || course.endDate >= today;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Faculty Courses & Training</h2>
        <div className="flex items-center space-x-2">
          <Switch id="toggle-past" checked={showPastCourses} onCheckedChange={setShowPastCourses} />
          <Label htmlFor="toggle-past">Show Past Trainings</Label>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-muted-foreground">No trainings to display.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{showPastCourses ? "All Trainings" : "Upcoming Trainings"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredCourses.map((course, idx) => (
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
