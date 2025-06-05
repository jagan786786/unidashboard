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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import {
  Eye,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Target,
  BarChart3,
} from "lucide-react";

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
  const [examData, setExamData] = useState<ExamRecord[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const rollNo = localStorage.getItem("userid");

  const fetchExamData = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/marks/student?rollNo=${rollNo}`
      );
      if (!res.ok) throw new Error("Failed to fetch exam data");
      const data = await res.json();

      const totalMarksPerSubject = 30; // Change this if needed
      const allExams: ExamRecord[] = [];

      for (const [examType, subjectsList] of Object.entries(data)) {
        const subjects: SubjectMark[] = (subjectsList as any[]).map((item) => ({
          examDate: item.examDate || "N/A",
          subject: item.subject || "Unknown Subject",
          marksSecured: item.marks,
          totalMarks: totalMarksPerSubject,
          percentage: (item.marks / totalMarksPerSubject) * 100,
        }));

        const marksSecured = subjects.reduce((sum, s) => sum + s.marksSecured, 0);
        const totalMarks = subjects.length * totalMarksPerSubject;
        const percentage = (marksSecured / totalMarks) * 100;

        const examRecord: ExamRecord = {
          exam: examType,
          marksSecured,
          totalMarks,
          percentage,
          subjects,
        };

        allExams.push(examRecord);
      }

      setExamData(allExams);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  fetchExamData();
}, []);


  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) {
      return (
        <Badge
          variant="secondary"
          className="bg-gray-800 text-white hover:bg-gray-800"
        >
          Excellent
        </Badge>
      );
    } else if (percentage >= 80) {
      return (
        <Badge
          variant="secondary"
          className="bg-gray-600 text-white hover:bg-gray-600"
        >
          Good
        </Badge>
      );
    } else if (percentage >= 70) {
      return (
        <Badge variant="outline" className="border-gray-400 text-gray-700">
          Average
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="border-gray-500 text-gray-600">
          Needs Improvement
        </Badge>
      );
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-gray-900 font-semibold";
    if (percentage >= 80) return "text-gray-800 font-medium";
    if (percentage >= 70) return "text-gray-700";
    return "text-gray-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <BarChart3 className="h-6 w-6 text-gray-700" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <p className="text-gray-600">Track your academic performance</p>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading exam data...</p>
      ) : error ? (
        <p className="text-red-600 font-medium">Error: {error}</p>
      ) : (
        <Card className="border">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
              <Award className="h-5 w-5 text-gray-700" />
              Overall Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-r">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Exam
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 border-r">
                      <div className="flex items-center justify-center gap-2">
                        <Target className="h-4 w-4" />
                        Score
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 border-r">
                      Performance
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900 border-r">
                      Progress
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {examData.map((exam, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 border-r">
                        <div className="font-medium text-gray-900">
                          {exam.exam}
                        </div>
                        <div className="text-sm text-gray-500">
                          {exam.subjects.length} subjects
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center border-r">
                        <div className="font-bold text-lg text-gray-900">
                          {exam.marksSecured}/{exam.totalMarks}
                        </div>
                        <div
                          className={`text-sm ${getPerformanceColor(
                            exam.percentage || 0
                          )}`}
                        >
                          {exam.percentage !== null
                            ? `${exam.percentage}%`
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center border-r">
                        {exam.percentage !== null &&
                          getPerformanceBadge(exam.percentage)}
                      </td>
                      <td className="px-6 py-4 border-r">
                        <div className="w-full max-w-24 mx-auto">
                          <Progress
                            value={exam.percentage || 0}
                            className="h-2 bg-gray-200"
                          />
                          <div className="text-xs text-gray-500 text-center mt-1">
                            {exam.percentage?.toFixed(1)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-gray-50 transition-colors"
                              onClick={() => setSelectedExam(exam)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader className="pb-4 border-b">
                              <DialogTitle className="flex items-center gap-2 text-xl text-gray-900">
                                <TrendingUp className="h-5 w-5 text-gray-700" />
                                Subject Wise Exam Mark - {selectedExam?.exam}
                              </DialogTitle>
                            </DialogHeader>

                            {selectedExam && (
                              <div className="space-y-4">
                                {/* Summary Cards */}
                                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded border">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">
                                      {selectedExam.marksSecured}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      Total Marks
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div
                                      className={`text-2xl font-bold ${getPerformanceColor(
                                        selectedExam.percentage || 0
                                      )}`}
                                    >
                                      {selectedExam.percentage?.toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      Overall %
                                    </div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-800">
                                      {
                                        selectedExam.subjects.filter(
                                          (s) => s.percentage >= 80
                                        ).length
                                      }
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      Good Scores
                                    </div>
                                  </div>
                                </div>

                                {/* Subject Details Table */}
                                <div className="overflow-auto max-h-96 border">
                                  <table className="w-full border-collapse">
                                    <thead className="bg-gray-100 sticky top-0">
                                      <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-900 border">
                                          Exam
                                        </th>
                                        {/* <th className="px-4 py-3 text-center font-semibold text-gray-900 border">
                                          <div className="flex items-center justify-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Exam Date
                                          </div>
                                        </th> */}
                                        <th className="px-4 py-3 text-center font-semibold text-gray-900 border">
                                          <div className="flex items-center justify-center gap-2">
                                            <BookOpen className="h-4 w-4" />
                                            Subject
                                          </div>
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-900 border">
                                          Mark Secured
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-900 border">
                                          Total Mark
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-900 border">
                                          Percentage
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedExam.subjects.map(
                                        (subject, i) => (
                                          <tr
                                            key={i}
                                            className="hover:bg-gray-50 transition-colors"
                                          >
                                            <td className="px-4 py-3 border font-medium text-gray-900">
                                              {selectedExam.exam}
                                            </td>
                                            {/* <td className="px-4 py-3 text-center border text-gray-700">
                                              {subject.examDate}
                                            </td> */}
                                            <td className="px-4 py-3 text-center border font-medium text-gray-900">
                                              {subject.subject}
                                            </td>
                                            <td className="px-4 py-3 text-center border text-gray-900">
                                              {subject.marksSecured}
                                            </td>
                                            <td className="px-4 py-3 text-center border text-gray-900">
                                              {subject.totalMarks}
                                            </td>
                                            <td className="px-4 py-3 text-center border">
                                              <div
                                                className={`font-medium ${getPerformanceColor(
                                                  subject.percentage
                                                )}`}
                                              >
                                                {subject.percentage.toFixed(2)}%
                                              </div>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
