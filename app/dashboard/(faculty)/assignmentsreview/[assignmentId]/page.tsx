"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface AssignmentData {
  id: number;
  title: string;
  section: string;
  subject: string;
}

interface Assignment {
  id: number;
  rollNo: string;
  studentName?: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "late" | string;
  feedback?: string;
  grade?: string;
  fileUrl: string;
  assignment: AssignmentData;
}

function AssignmentReviewClient() {
  const router = useRouter();
  const params = useParams();

  const assignmentId = params?.assignmentId;

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!assignmentId) {
      setError("Assignment ID not found in URL");
      setLoading(false);
      return;
    }

    async function fetchAssignment() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:8080/api/student/${assignmentId}`
        );
        if (!res.ok) throw new Error("Failed to fetch assignment submission");
        const data = await res.json();
        setAssignment(data);
        setFeedback(data.feedback || "");
        setGrade(data.grade || "");
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchAssignment();
  }, [assignmentId]);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async () => {
    if (!assignment) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:8080/api/student/${assignment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feedback,
            grade,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to submit review");
      }

      alert("Feedback and grade submitted successfully!");
      router.back();
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string): React.ReactElement => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending Review
          </Badge>
        );
      case "reviewed":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-green-100 text-green-800"
          >
            <CheckCircle className="h-3 w-3" /> Reviewed
          </Badge>
        );
      case "late":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> Late Submission
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) return <p>Loading assignment data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!assignment) return <p>No assignment data found.</p>;

  const {
    rollNo,
    studentName,
    submittedAt,
    status,
    feedback: prevFeedback,
    grade: prevGrade,
    fileUrl,
    assignment: innerAssignment,
  } = assignment;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Assignments
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Assignment Details
              {getStatusBadge(status)}
            </CardTitle>
            <p className="text-muted-foreground">
              Review the assignment submission
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Roll Number
                </h4>
                <p className="font-medium">{rollNo}</p>
              </div>
              {/* <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Student Name
                </h4>
                <p className="font-medium">{studentName || "N/A"}</p>
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Subject
                </h4>
                <p className="font-medium capitalize">
                  {innerAssignment.subject}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Section
                </h4>
                <p className="font-medium">Section {innerAssignment.section}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Assignment Title
              </h4>
              <p className="font-medium">{innerAssignment.title}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Submitted At
              </h4>
              <p className="font-medium">
                {format(new Date(submittedAt), "MMMM dd, yyyy 'at' HH:mm")}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Submission File</h4>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">Assignment Submission</span>
                </div>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </a>
              </div>
            </div>

            {status === "reviewed" && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Previous Feedback</h4>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm">
                      {prevFeedback || "No feedback provided."}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Grade</h4>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm font-bold">
                      {prevGrade || "Not graded"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Assignment</CardTitle>
            <p className="text-muted-foreground">
              Provide feedback and grade for this submission
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                placeholder="Enter grade (e.g., A, B+, 95%)"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Provide detailed feedback on the assignment..."
                className="min-h-[200px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AssignmentReviewClient;
