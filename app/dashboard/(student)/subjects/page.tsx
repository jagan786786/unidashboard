"use client";

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
  { code: "ESSB", name: "ESSB", semester: 2 },
  { code: "BE & CSR", name: "BE & CSR", semester: 2 },
  { code: "RMM", name: "RMM", semester: 2 },
  { code: "MM", name: "MM", semester: 2 },
  { code: "CF", name: "CF", semester: 2 },
  { code: "HRM", name: "HRM", semester: 2 },
  { code: "OM", name: "OM", semester: 2 },
  { code: "BA", name: "BA", semester: 2 },
  { code: "PRESENTATION", name: "PRESENTATION", semester: 2 },
  { code: "ENGLISH-2", name: "ENGLISH-2", semester: 2 },
  { code: "APTITUDE", name: "APTITUDE", semester: 2 },
  { code: "ENGLISH-1", name: "ENGLISH-1", semester: 2 },
  { code: "MANAGEMENT ACTIVITY", name: "MANAGEMENT ACTIVITY", semester: 2 },
  { code: "TRAINING", name: "TRAINING", semester: 2 },
];

export default function SubjectTable() {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>📚 Registered Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-gray-800">
                <TableRow>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Semester</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subj, index) => (
                  <TableRow key={index}>
                    <TableCell>{subj.code}</TableCell>
                    <TableCell>{subj.name}</TableCell>
                    <TableCell>{subj.semester}</TableCell>
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
