"use client";

import ClassSchedule from "@/components/ClassSchedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


type Schedule = {
  facultyId: string;
  program: string;
  branch: string;
  section: string;
  course: string;
  day: string;
  time: string;
  room: string;
};

export function FacultyDashboard() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const token = localStorage.getItem("token"); // or sessionStorage
      const facultyId = localStorage.getItem("userid"); // or sessionStorage
      if (!facultyId) return;

      try {
        const res = await fetch(
          `http://localhost:8080/api/schedules/faculty?facultyId=${facultyId}`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`, // if needed
          //   },
          // }
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


  if (loading) return <p>Loading schedule...</p>;
  
  
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsContent value="overview" className="space-y-6">
        {/* Metric Cards (unchanged) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/markattendance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Spring 2025 Semester
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/assignmentsreview">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Assign Assignments
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">
                  Across all courses
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* <Link href="/dashboard/courses">
            {" "}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Spring 2025 Semester
                </p>
              </CardContent>
            </Card>
          </Link> */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Office Hours
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ Class Schedule Section */}
        <ClassSchedule
          schedule={schedule.map((item) => ({
            ...item,
            semester: (item as any).semester ?? "",
            courseName: (item as any).courseName ?? item.course ?? "",
          }))}
        />
      </TabsContent>
    </Tabs>
  );
}
