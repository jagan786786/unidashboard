"use client";

import ClassSchedule from "@/components/ClassSchedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// ✅ Simulated Logged-in Faculty (replace with session/auth)
const loggedInFaculty = {
  id: "F001",
  name: "Dr. Kartik",
};

// ✅ Simulated Schedule Data (replace with API data)
const dummySchedule = [
  {
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Web Development",
    day: "Monday",
    time: "10:00 AM - 11:00 AM",
    room: "Block A - 101",
  },
  {
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Data Structures",
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
    room: "Block A - 102",
  },
];

type Schedule = {
  facultyId: string;
  program: string;
  section: string;
  course: string;
  day: string;
  time: string;
  room: string;
};

export function FacultyDashboard() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);

  // useEffect(() => {
  //   const facultySchedule = allSchedules.filter(
  //     (cls) => cls.facultyId === loggedInFaculty.id
  //   );
  //   setSchedule(facultySchedule);
  // }, []);

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsContent value="overview" className="space-y-6">
        {/* Metric Cards (unchanged) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
          <Link href="/dashboard/sections">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sections
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
          <Link href="/dashboard/courses">
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
          </Link>

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
        <ClassSchedule schedule={dummySchedule} />
      </TabsContent>
    </Tabs>
  );
}
