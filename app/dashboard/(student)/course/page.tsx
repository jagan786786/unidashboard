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

export default function StudentCoursesPage() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [showPastCourses, setShowPastCourses] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/Trainings?type=student&page=0&size=50");
        const data = await res.json();
        setAllCourses(data.content);
      } catch (error) {
        console.error("Failed to fetch student trainings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
    return showPastCourses || course.endDate >= today;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Courses & Training</h2>
        <div className="flex items-center space-x-2">
          <Switch id="toggle-past" checked={showPastCourses} onCheckedChange={setShowPastCourses} />
          <Label htmlFor="toggle-past">Show Past Courses</Label>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-muted-foreground">No courses to display.</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{showPastCourses ? "All Courses" : "Upcoming Courses"}</CardTitle>
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
