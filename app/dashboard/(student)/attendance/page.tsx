"use client";

import { useState } from "react";
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

const subjects = [
  "ESSB",
  "BE & CSR",
  "RMM",
  "MM",
  "CF",
  "HRM",
  "OM",
  "BA",
  "Total",
] as const;

type Subject = (typeof subjects)[number];

type AttendanceRow = {
  date: string;
  data: Record<Subject, string>;
};

const attendanceData: AttendanceRow[] = [
  {
    date: "22-Apr-2025",
    data: {
      ESSB: "NC",
      "BE & CSR": "NC",
      RMM: "0/2",
      MM: "0/2",
      CF: "NC",
      HRM: "NC",
      OM: "3/3",
      BA: "1/1",
      Total: "4/8",
    },
  },
  {
    date: "21-Apr-2025",
    data: {
      ESSB: "0/1",
      "BE & CSR": "1/1",
      RMM: "1/1",
      MM: "1/1",
      CF: "1/1",
      HRM: "2/2",
      OM: "2/2",
      BA: "NC",
      Total: "5/7",
    },
  },
  // Add more rows based on your data
];

export default function AttendancePage() {
  const [rollNumber, setRollNumber] = useState("24MBA045");

  return (
    <div className=" space-y-6">
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
                {attendanceData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.date}</TableCell>
                    {subjects.map((sub, idx) => {
                      const value = row.data[sub];
                      const isAbsent = value?.includes("0/") || value === "0/1";
                      const isNotConducted = value === "NC";

                      return (
                        <TableCell
                          key={idx}
                          className={`whitespace-nowrap font-medium
    ${
      isAbsent
        ? "bg-red-100 text-red-700 dark:bg-black dark:text-white"
        : isNotConducted
        ? "text-muted-foreground dark:text-gray-400"
        : "bg-blue-50 text-blue-800 dark:bg-black dark:text-white"
    }
  `}
                        >
                          {value || "NC"}
                        </TableCell>

                        // <TableCell
                        //   key={idx}
                        //   className={`${
                        //     isAbsent
                        //       ? "bg-red-100 text-red-700"
                        //       : isNotConducted
                        //       ? "text-muted-foreground"
                        //       : "bg-blue-50 text-blue-800"
                        //   } font-medium whitespace-nowrap`}
                        // >
                        //   {value || "NC"}
                        // </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
