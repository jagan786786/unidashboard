"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Clock, FileText, Wallet, GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

type Schedule = {
  id: number;
  courseName: string;
  time: string;
  facultyName: string;
  day: string;
  type: "Theory" | "Lab";
  room?: string;
};

type StudentProfile = {
  id?: number;
  name: string;
  program: string;
  branch: string;
  section?: string; // made optional in case backend does not provide it yet
  semester: number;
};

export function StudentDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  useEffect(() => {
    async function fetchProfileAndSchedule() {
      const rollNo = localStorage.getItem("userid");
      if (!rollNo) {
        console.error("No userid found in localStorage");
        setLoading(false);
        return;
      }

      try {
        // Fetch student profile
        const profileRes = await fetch(
          `http://localhost:8080/api/admin/student/${rollNo}`
        );
        if (!profileRes.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await profileRes.json();

        // Map backend response to frontend type (fallback if section missing)
        const mappedProfile: StudentProfile = {
          id: profileData.id, // if available
          name: profileData.name,
          program: profileData.program,
          branch: profileData.branch,
          section: profileData.sectionName || "", // fallback to empty string if undefined
          semester: profileData.semester,
        };
        setProfile(mappedProfile);

        // Fetch schedule based on profile data
        const { program, branch, section, semester } = mappedProfile;

        // Defensive check
        if (!program || !branch || !section || !semester) {
          console.warn("Incomplete profile data, skipping schedule fetch");
          setSchedule([]);
          return;
        }

        const scheduleRes = await fetch(
          `http://localhost:8080/api/schedules/student?program=${encodeURIComponent(
            program
          )}&branch=${encodeURIComponent(branch)}&section=${encodeURIComponent(
            section
          )}&semester=${encodeURIComponent(semester)}`
        );

        if (!scheduleRes.ok) {
          throw new Error("Failed to fetch schedule");
        }

        const scheduleData = await scheduleRes.json();

        const typedSchedule: Schedule[] = scheduleData.map((cls: any) => ({
          id: cls.id,
          courseName: cls.subject || cls.courseName || "Unknown Subject",
          day: cls.day,
          time: cls.time,
          facultyName: cls.faculty || cls.facultyName || "Unknown Faculty",
          type: cls.type === "Lab" ? "Lab" : "Theory",
          room: cls.room,
        }));

        setSchedule(typedSchedule);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileAndSchedule();
  }, []);

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsContent value="overview" className="space-y-6">
        {/* Dashboard Cards */}
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
          <Link href="/dashboard/assignments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Assignments
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">2 due this week</p>
              </CardContent>
            </Card>
          </Link>

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

        {/* Attendance Summary */}
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

        {/* Today's Time Table */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Time Table ({today})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <>
                {schedule.filter((cls) => cls.day === today).length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-6 rounded-lg bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-100 shadow-inner">
                    <h2 className="text-2xl font-semibold mb-2">
                      🎉 No Classes Today!
                    </h2>
                    <p className="text-sm">
                      Enjoy your break and take some time to relax or revise.
                    </p>
                  </div>
                ) : (
                  schedule
                    .filter((cls) => cls.day === today)
                    .map((cls) => (
                      <div
                        key={cls.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <p className="font-medium">{cls.courseName}</p>
                          <p className="text-sm text-muted-foreground">
                            {cls.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {cls.facultyName}
                          </p>
                          {cls.room && (
                            <p className="text-sm text-muted-foreground italic">
                              Room: {cls.room}
                            </p>
                          )}
                        </div>
                        <Badge>{cls.type}</Badge>
                      </div>
                    ))
                )}
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
