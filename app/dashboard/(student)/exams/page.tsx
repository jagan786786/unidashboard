"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SubjectMark {
  examDate: string;
  subject: string;
  marksSecured: number;
  totalMarks: number;
  percentage: number;
}

interface ExamRecord {
  exam: string;
  marksSecured: number;
  totalMarks: number;
  percentage: number | null;
  subjects: SubjectMark[];
}

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<ExamRecord | null>(null);

  const examData: ExamRecord[] = [
    {
      exam: "CYCLE TEST-1",
      marksSecured: 143,
      totalMarks: 180,
      percentage: 79.44,
      subjects: [
        {
          examDate: "19-Oct-2024",
          subject: "MG",
          marksSecured: 26,
          totalMarks: 30,
          percentage: 86.67,
        },
        {
          examDate: "21-Oct-2024",
          subject: "OB",
          marksSecured: 22,
          totalMarks: 30,
          percentage: 73.33,
        },
        {
          examDate: "18-Oct-2024",
          subject: "PPM",
          marksSecured: 24,
          totalMarks: 30,
          percentage: 80.0,
        },
        {
          examDate: "18-Oct-2024",
          subject: "ME",
          marksSecured: 28,
          totalMarks: 30,
          percentage: 93.33,
        },
        {
          examDate: "21-Oct-2024",
          subject: "QT",
          marksSecured: 22,
          totalMarks: 30,
          percentage: 73.33,
        },
        {
          examDate: "22-Oct-2024",
          subject: "ITM",
          marksSecured: 21,
          totalMarks: 30,
          percentage: 70.0,
        },
      ],
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Exam Results</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Exam</th>
                <th className="border px-4 py-2">Marks Secured</th>
                <th className="border px-4 py-2">Total Marks</th>
                <th className="border px-4 py-2">Percentage</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((exam, index) => (
                <tr key={index} className="text-center">
                  <td className="border px-4 py-2 text-left">{exam.exam}</td>
                  <td className="border px-4 py-2">{exam.marksSecured}</td>
                  <td className="border px-4 py-2">{exam.totalMarks}</td>
                  <td className="border px-4 py-2">
                    {exam.percentage !== null ? `${exam.percentage}%` : "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedExam(exam)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Subject Wise Exam Mark</DialogTitle>
                        </DialogHeader>
                        <div className="overflow-auto">
                          <table className="w-full table-auto border text-sm">
                            <thead className="bg-grey-100 text-black">
                              <tr>
                                <th className="border px-4 py-2">Exam</th>
                                <th className="border px-4 py-2">Exam Date</th>
                                <th className="border px-4 py-2">Subject</th>
                                <th className="border px-4 py-2">
                                  Mark Secured
                                </th>
                                <th className="border px-4 py-2">Total Mark</th>
                                <th className="border px-4 py-2">Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedExam?.subjects.map((s, i) => (
                                <tr key={i}>
                                  <td className="border px-4 py-2">
                                    {selectedExam.exam}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {s.examDate}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {s.subject}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {s.marksSecured}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {s.totalMarks}
                                  </td>
                                  <td className="border px-4 py-2">
                                    {s.percentage}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
