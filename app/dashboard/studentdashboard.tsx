"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileText, Wallet, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function StudentDashboard() {
  const router = useRouter();
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/exams">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Exams</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5</div>
                <p className="text-xs text-muted-foreground">
                  +0.25 from last semester
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/attendance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Attendance
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <Progress value={92} className="mt-2" />
              </CardContent>
            </Card>
          </Link>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Assignments
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </CardContent>
          </Card>
          <Link href="/dashboard/dues">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fee Status
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Paid</div>
                <p className="text-xs text-muted-foreground">
                  Next due: 15 Aug 2025
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Theory Attendance</p>
              <Progress value={89} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">89%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Lab Attendance</p>
              <Progress value={0} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">0%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Attendance</p>
              <Progress value={89} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1 text-green-600">
                89% - Good Attendance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Today's Time Table Section */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Time Table (Thursday)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                subject: "BA",
                time: "8:30 AM - 9:30 AM",
                faculty: "Dr. I J Raghavendra",
              },
              {
                subject: "HRM",
                time: "9:30 AM - 10:30 AM",
                faculty: "Mrs. Swapnamayee Sahoo",
              },
              {
                subject: "BE & CSR",
                time: "10:50 AM - 11:50 AM",
                faculty: "Mr. Karteek Madapana",
              },
              {
                subject: "BA",
                time: "10:50 AM - 11:50 AM",
                faculty: "Dr. I J Raghavendra",
              },
              {
                subject: "ESSB",
                time: "4:00 PM - 5:00 PM",
                faculty: "Mr. A. Chiranjibi Rambabu Achary",
              },
              {
                subject: "OM",
                time: "5:00 PM - 6:00 PM",
                faculty: "Mr. Sandeep Jena",
              },
            ].map((cls, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{cls.subject}</p>
                  <p className="text-sm text-muted-foreground">{cls.time}</p>
                  <p className="text-sm text-muted-foreground">{cls.faculty}</p>
                </div>
                <Badge>Theory</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="courses">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>
              You are currently enrolled in 5 courses for the Spring 2025
              semester.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Introduction to Computer Science",
                  code: "CS101",
                  instructor: "Dr. Jane Smith",
                  progress: 65,
                },
                {
                  name: "Calculus II",
                  code: "MATH202",
                  instructor: "Prof. Robert Johnson",
                  progress: 78,
                },
                {
                  name: "Physics for Engineers",
                  code: "PHYS201",
                  instructor: "Dr. Michael Brown",
                  progress: 42,
                },
                {
                  name: "Technical Writing",
                  code: "ENG104",
                  instructor: "Prof. Sarah Williams",
                  progress: 90,
                },
                {
                  name: "Data Structures",
                  code: "CS201",
                  instructor: "Dr. David Lee",
                  progress: 55,
                },
              ].map((course, i) => (
                <div
                  key={i}
                  className="flex flex-col space-y-2 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.code} • {course.instructor}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Course
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              Your class schedule for the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-semibold">{day}</h3>
                    <div className="space-y-2">
                      {i % 2 === 0 ? (
                        <>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                CS101 - Introduction to Computer Science
                              </p>
                              <p className="text-sm text-muted-foreground">
                                09:00 AM - 10:30 AM • Room 302
                              </p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                MATH202 - Calculus II
                              </p>
                              <p className="text-sm text-muted-foreground">
                                11:00 AM - 12:30 PM • Room 201
                              </p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                        </>
                      ) : i % 3 === 0 ? (
                        <>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                PHYS201 - Physics for Engineers
                              </p>
                              <p className="text-sm text-muted-foreground">
                                09:00 AM - 10:30 AM • Lab 105
                              </p>
                            </div>
                            <Badge>Lab</Badge>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                CS201 - Data Structures
                              </p>
                              <p className="text-sm text-muted-foreground">
                                02:00 PM - 03:30 PM • Room 305
                              </p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">
                              ENG104 - Technical Writing
                            </p>
                            <p className="text-sm text-muted-foreground">
                              01:00 PM - 02:30 PM • Room 105
                            </p>
                          </div>
                          <Badge>Lecture</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="grades">
        <Card>
          <CardHeader>
            <CardTitle>Current Grades</CardTitle>
            <CardDescription>
              Your academic performance for the current semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Introduction to Computer Science",
                  code: "CS101",
                  grade: "A",
                  percentage: 92,
                },
                {
                  name: "Calculus II",
                  code: "MATH202",
                  grade: "B+",
                  percentage: 87,
                },
                {
                  name: "Physics for Engineers",
                  code: "PHYS201",
                  grade: "B",
                  percentage: 83,
                },
                {
                  name: "Technical Writing",
                  code: "ENG104",
                  grade: "A-",
                  percentage: 90,
                },
                {
                  name: "Data Structures",
                  code: "CS201",
                  grade: "B+",
                  percentage: 88,
                },
              ].map((course, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{course.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {course.code}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{course.percentage}%</p>
                      <p className="text-sm text-muted-foreground">Current</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <span className="font-bold">{course.grade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
