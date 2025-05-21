"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Bell,
  BarChart3,
  Users,
  Wallet,
  GraduationCap,
  BookMarked,
  Building,
  Bus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

export function StudentDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="courses">My Courses</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="grades">Grades</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.75</div>
              <p className="text-xs text-muted-foreground">
                +0.25 from last semester
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <Progress value={92} className="mt-2" />
            </CardContent>
          </Card>

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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Paid</div>
              <p className="text-xs text-muted-foreground">
                Next due: 15 Aug 2025
              </p>
            </CardContent>
          </Card>
        </div>

       
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
