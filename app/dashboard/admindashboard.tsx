"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Users,
  Wallet,
  GraduationCap,
  BookMarked,
  Library,
  Medal,
  BookOpenCheck,
} from "lucide-react";
import Link from "next/link";

export function AdminDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsContent value="overview" className="space-y-6">
        {/* Cards Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/student/list">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,238</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last year
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/faculty/list">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Faculty Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">312</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last year
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/student/course">
            {" "}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Courses
                </CardTitle>
                <BookMarked className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">187</div>
                <p className="text-xs text-muted-foreground">
                  Spring 2025 Semester
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* University Info Section (Student + Faculty Info) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/administrative">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Administrative Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">17:1</div>
                <p className="text-xs text-muted-foreground">
                  Administrative details of students
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/departments">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Departments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">
                  Including Engineering, Sciences, Management, and Arts
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Avg. Student GPA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.48</div>
              <p className="text-xs text-muted-foreground">
                Based on academic year 2024-25
              </p>
            </CardContent>
          </Card> */}

          {/* <Link href="/dashboard/placement">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Placement Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91%</div>
                <p className="text-xs text-muted-foreground">
                  For eligible students (Class of 2024)
                </p>
              </CardContent>
            </Card>
          </Link> */}

          <Link href="/dashboard/ct-facility">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Courses and Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">91%</div>
                <p className="text-xs text-muted-foreground">
                  For faculties and eligible students 
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/faculty-publications">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Faculty Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,204</div>
                <p className="text-xs text-muted-foreground">
                  Papers in peer-reviewed journals
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/student-clubs">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Student Clubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">
                  Including tech, culture, sports, and literature
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </TabsContent>
    </Tabs>
  );
}
