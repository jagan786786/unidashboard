"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AttendanceRecord = {
  date: string; // ISO string date like "2025-04-22"
  courseName: string; // Subject name
  presentCount: number;
  totalClasses: number;
};

type AttendanceRow = {
  date: string; // e.g. "22-Apr-2025"
  data: Record<string, string>; // subject -> "presentCount/totalClasses" or "NC"
};

export default function AttendancePage() {
  const [rollNumber, setRollNumber] = useState(
    () => localStorage.getItem("userid") || ""
  );

  const [attendanceData, setAttendanceData] = useState<AttendanceRow[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  // Fetch attendance data from backend
  useEffect(() => {
    async function fetchAttendance() {
      const rollNumber = localStorage.getItem("userid");
      console.log("Fetching attendance for roll number:", rollNumber);

      if (!rollNumber) {
        setAttendanceData([]);
        setSubjects([]);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/attendance/student/${rollNumber}`
        );
        if (!res.ok) {
          console.error("Failed to fetch attendance data");
          setAttendanceData([]);
          setSubjects([]);
          return;
        }
        const data: AttendanceRecord[] = await res.json();

        // Extract unique subjects from data
        const uniqueSubjects = Array.from(
          new Set(data.map((r) => r.courseName))
        ).sort();

        // Group attendance by date
        const groupedByDate: Record<string, AttendanceRecord[]> = {};
        data.forEach((record) => {
          if (!groupedByDate[record.date]) groupedByDate[record.date] = [];
          groupedByDate[record.date].push(record);
        });

        // Prepare rows
        const rows: AttendanceRow[] = [];

        for (const date of Object.keys(groupedByDate).sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
        )) {
          const records = groupedByDate[date];

          const dataForDate: Record<string, string> = {};

          // Initialize all subjects to NC
          uniqueSubjects.forEach((sub) => {
            dataForDate[sub] = "NC";
          });

          let totalPresent = 0;
          let totalClasses = 0;

          // Aggregate subject-wise present/total for the same day
          const subjectMap: Record<string, { present: number; total: number }> =
            {};

          for (const rec of records) {
            if (!subjectMap[rec.courseName]) {
              subjectMap[rec.courseName] = { present: 0, total: 0 };
            }
            subjectMap[rec.courseName].present += rec.presentCount;
            subjectMap[rec.courseName].total += rec.totalClasses;

            totalPresent += rec.presentCount;
            totalClasses += rec.totalClasses;
          }

          // Fill dataForDate with aggregated values
          for (const subject of Object.keys(subjectMap)) {
            const { present, total } = subjectMap[subject];
            dataForDate[subject] = `${present}/${total}`;
          }

          dataForDate["Total"] = `${totalPresent}/${totalClasses}`;

          // Format date e.g. 22-Apr-2025
          const formattedDate = new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          rows.push({
            date: formattedDate,
            data: dataForDate,
          });
        }

        setSubjects([...uniqueSubjects, "Total"]);
        setAttendanceData(rows);
      } catch (error) {
        console.error("Error fetching attendance", error);
        setAttendanceData([]);
        setSubjects([]);
      }
    }

    fetchAttendance();
  }, [rollNumber]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📅 Day Wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-60"
              readOnly
            />
            <Button variant="outline">Excel</Button>
            <Button variant="outline">Print</Button>
          </div>

          <div className="overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Date</TableHead>
                  {subjects.map((sub) => (
                    <TableHead key={sub} className="whitespace-nowrap">
                      {sub}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={subjects.length + 1}
                      className="text-center"
                    >
                      No attendance data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  attendanceData.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.date}</TableCell>
                      {subjects.map((sub, idx) => {
                        const value = row.data[sub];
                        const isAbsent =
                          value?.startsWith("0/") || value === "0/1";
                        const isNotConducted = value === "NC";

                        return (
                          <TableCell
                            key={idx}
                            className={`whitespace-nowrap font-medium ${
                              isAbsent
                                ? "bg-red-100 text-red-700 dark:bg-black dark:text-white"
                                : isNotConducted
                                ? "text-muted-foreground dark:text-gray-400"
                                : "bg-blue-50 text-blue-800 dark:bg-black dark:text-white"
                            }`}
                          >
                            {value || "NC"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
