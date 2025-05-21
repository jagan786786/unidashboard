"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, FileText, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
export function FacultyDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">My Courses</TabsTrigger>
        <TabsTrigger value="students">Students</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Spring 2025 Semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Grades
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Due by May 25, 2025
              </p>
            </CardContent>
          </Card>

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
      </TabsContent>

      <TabsContent value="courses">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>
              You are currently teaching 4 courses for the Spring 2025 semester.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Advanced Programming",
                  code: "CS301",
                  students: 32,
                  schedule: "Mon, Wed 10:00 AM - 11:30 AM",
                  room: "302",
                },
                {
                  name: "Data Structures",
                  code: "CS201",
                  students: 45,
                  schedule: "Tue, Thu 1:00 PM - 2:30 PM",
                  room: "305",
                },
                {
                  name: "Algorithms",
                  code: "CS401",
                  students: 28,
                  schedule: "Mon, Wed 2:00 PM - 3:30 PM",
                  room: "301",
                },
                {
                  name: "Database Systems",
                  code: "CS302",
                  students: 22,
                  schedule: "Fri 9:00 AM - 12:00 PM",
                  room: "Lab 105",
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
                        {course.code} • {course.students} students
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button size="sm">Enter Class</Button>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{course.schedule}</span>
                    <span className="mx-2">•</span>
                    <span>Room {course.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="students">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>
                View and manage students across your courses
              </CardDescription>
            </div>
            <Button>Export Data</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                  <div>Name</div>
                  <div>ID</div>
                  <div>Course</div>
                  <div>Attendance</div>
                  <div>Current Grade</div>
                </div>
                {[
                  {
                    name: "Alex Johnson",
                    id: "STU123456",
                    course: "CS301",
                    attendance: 95,
                    grade: "A-",
                  },
                  {
                    name: "Emily Chen",
                    id: "STU234567",
                    course: "CS201",
                    attendance: 88,
                    grade: "B+",
                  },
                  {
                    name: "Michael Brown",
                    id: "STU345678",
                    course: "CS401",
                    attendance: 92,
                    grade: "B",
                  },
                  {
                    name: "Sarah Williams",
                    id: "STU456789",
                    course: "CS302",
                    attendance: 98,
                    grade: "A",
                  },
                  {
                    name: "David Lee",
                    id: "STU567890",
                    course: "CS301",
                    attendance: 85,
                    grade: "B-",
                  },
                  {
                    name: "Jennifer Kim",
                    id: "STU678901",
                    course: "CS201",
                    attendance: 90,
                    grade: "B+",
                  },
                  {
                    name: "Robert Johnson",
                    id: "STU789012",
                    course: "CS401",
                    attendance: 94,
                    grade: "A-",
                  },
                  {
                    name: "Lisa Wang",
                    id: "STU890123",
                    course: "CS302",
                    attendance: 97,
                    grade: "A",
                  },
                ].map((student, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-5 gap-4 p-4 border-b last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(
                            0
                          )}`}
                        />
                        <AvatarFallback>
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{student.name}</span>
                    </div>
                    <div className="flex items-center">{student.id}</div>
                    <div className="flex items-center">{student.course}</div>
                    <div className="flex items-center">
                      {student.attendance}%
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{student.grade}</span>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Teaching Schedule</CardTitle>
            <CardDescription>
              Your teaching and office hours schedule for the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day, i) => (
                  <div key={i} className="space-y-2">
                    <h3 className="font-semibold">{day}</h3>
                    <div className="space-y-2">
                      {i === 0 || i === 2 ? (
                        <>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                CS301 - Advanced Programming
                              </p>
                              <p className="text-sm text-muted-foreground">
                                10:00 AM - 11:30 AM • Room 302
                              </p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">CS401 - Algorithms</p>
                              <p className="text-sm text-muted-foreground">
                                2:00 PM - 3:30 PM • Room 301
                              </p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                          {i === 0 && (
                            <div className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <p className="font-medium">Office Hours</p>
                                <p className="text-sm text-muted-foreground">
                                  4:00 PM - 6:00 PM • Room 310
                                </p>
                              </div>
                              <Badge variant="outline">Office Hours</Badge>
                            </div>
                          )}
                        </>
                      ) : i === 1 || i === 3 ? (
                        <>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                CS201 - Data Structures
                              </p>
                              <p className="text-sm text-muted-foreground">
                                1:00 PM - 2:30 PM • Room 305
                              </p>
                            </div>
                            <Badge>Lecture</Badge>
                          </div>
                          {i === 3 && (
                            <div className="flex items-center justify-between rounded-lg border p-3">
                              <div>
                                <p className="font-medium">Office Hours</p>
                                <p className="text-sm text-muted-foreground">
                                  3:00 PM - 5:00 PM • Room 310
                                </p>
                              </div>
                              <Badge variant="outline">Office Hours</Badge>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">
                                CS302 - Database Systems
                              </p>
                              <p className="text-sm text-muted-foreground">
                                9:00 AM - 12:00 PM • Lab 105
                              </p>
                            </div>
                            <Badge>Lab</Badge>
                          </div>
                          <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                              <p className="font-medium">Department Meeting</p>
                              <p className="text-sm text-muted-foreground">
                                2:00 PM - 3:30 PM • Conference Room
                              </p>
                            </div>
                            <Badge variant="outline">Meeting</Badge>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
