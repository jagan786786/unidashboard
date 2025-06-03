"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid3X3,
  List,
  Search,
  CalendarDays,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

type Assignment = {
  title: string;
  description: string;
  dueDate: string;
  fileUrl: string;
  status: "pending" | "submitted" | "overdue";
  subject: string;
  id: number | string;
  program?: string;
  branch?: string;
  section?: string;
  semester?: string;
  submittedFileUrl?: string;
};

export default function StudentAssignmentsDashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [rollNo, setRollNo] = useState<string | null>(
    localStorage.getItem("userid")
  );

  const [uniqueSubjects, setUniqueSubjects] = useState<string[]>([]);

  // Submit modal states
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const rollNumber = localStorage.getItem("userid");
    setRollNo(rollNumber);
    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/api/assignments/${rollNumber}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch assignments");
        return res.json();
      })
      .then(async (data: Assignment[]) => {
        const updatedAssignments = await Promise.all(
          data.map(async (assignment) => {
            try {
              const response = await fetch(
                `http://localhost:8080/api/student/${rollNumber}/assignment/${assignment.id}/submission`
              );
              if (response.ok) {
                const submission = await response.json();
                return {
                  ...assignment,
                  status: "submitted" as "submitted",
                  submittedFileUrl: submission.fileUrl,
                };
              } else {
                return assignment;
              }
            } catch (err) {
              console.error("Error checking submission:", err);
              return assignment;
            }
          })
        );

        setAssignments(updatedAssignments);

        const subjectSet = new Set<string>();
        const seen = new Set<string>();
        updatedAssignments.forEach((a) => {
          const key = `${a.program}-${a.branch}-${a.section}-${a.semester}-${a.subject}`;
          if (!seen.has(key)) {
            seen.add(key);
            subjectSet.add(a.subject);
          }
        });

        setUniqueSubjects(Array.from(subjectSet));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getEffectiveStatus = (assignment: Assignment) => {
    if (assignment.status === "submitted") return "submitted";
    const daysUntilDue = getDaysUntilDue(assignment.dueDate);
    return daysUntilDue < 0 ? "overdue" : "pending";
  };

  const getStatusInfo = (assignment: Assignment) => {
    const status = getEffectiveStatus(assignment);
    const daysUntilDue = getDaysUntilDue(assignment.dueDate);

    switch (status) {
      case "submitted":
        return {
          label: "Submitted",
          variant: "default" as const,
          icon: CheckCircle,
        };
      case "overdue":
        return {
          label: "Overdue",
          variant: "destructive" as const,
          icon: AlertCircle,
        };
      default:
        if (daysUntilDue === 0) {
          return {
            label: "Due Today",
            variant: "destructive" as const,
            icon: AlertCircle,
          };
        } else if (daysUntilDue <= 3) {
          return {
            label: `${daysUntilDue} days left`,
            variant: "destructive" as const,
            icon: Clock,
          };
        } else if (daysUntilDue <= 7) {
          return {
            label: `${daysUntilDue} days left`,
            variant: "default" as const,
            icon: Clock,
          };
        } else {
          return {
            label: `${daysUntilDue} days left`,
            variant: "secondary" as const,
            icon: Clock,
          };
        }
    }
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const title = assignment?.title?.toLowerCase() || "";
    const subject = assignment?.subject?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesSearch = title.includes(search) || subject.includes(search);

    const effectiveStatus = getEffectiveStatus(assignment);
    const matchesStatus =
      filterStatus === "all" || effectiveStatus === filterStatus;

    const matchesSubject =
      filterSubject === "all" || assignment.subject === filterSubject;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  // Download handler
  const handleDownload = (fileUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = title || "assignment-file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Open submit modal
  const openSubmitModal = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmitModalOpen(true);
  };

  // Close submit modal
  const closeSubmitModal = () => {
    setSubmitModalOpen(false);
    setSelectedAssignment(null);
    setFileToUpload(null);
  };

  // Handle file selection in modal
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
    }
  };

  // Handle submit modal form
  const handleSubmitAssignment = async () => {
    if (!fileToUpload || !selectedAssignment || !rollNo) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const response = await fetch(
        `http://localhost:8080/api/student/${rollNo}/assignment/${selectedAssignment.id}/submit`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit assignment");
      }

      alert("Assignment Submitted Successfully");
      closeSubmitModal();

      // ✅ Update local state to reflect submission
      setAssignments((prevAssignments) =>
        prevAssignments.map((a) =>
          a.id === selectedAssignment.id ? { ...a, status: "submitted" } : a
        )
      );
    } catch (err: any) {
      alert("Submission failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
    const statusInfo = getStatusInfo(assignment);
    const StatusIcon = statusInfo.icon;

    return (
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {assignment.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {assignment.subject}
              </p>
            </div>
            <Badge
              variant={statusInfo.variant}
              className="flex items-center gap-1 ml-2"
            >
              <StatusIcon className="h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {assignment.description}
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>Due: {formatDate(assignment.dueDate)}</span>
            </div>
            <div className="flex gap-2">
              {getEffectiveStatus(assignment) === "submitted" ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    if (assignment.submittedFileUrl) {
                      handleDownload(
                        assignment.submittedFileUrl,
                        assignment.title + "_submission"
                      );
                    }
                  }}
                >
                  View Submission
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => openSubmitModal(assignment)}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Submit
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleDownload(assignment.fileUrl, assignment.title)
                }
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const AssignmentListItem = ({ assignment }: { assignment: Assignment }) => {
    const statusInfo = getStatusInfo(assignment);
    const StatusIcon = statusInfo.icon;

    return (
      <Card className="mb-3">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{assignment.title}</h3>
                <Badge
                  variant={statusInfo.variant}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="h-3 w-3" />
                  {statusInfo.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {assignment.subject}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {assignment.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <CalendarDays className="h-4 w-4" />
                <span>Due: {formatDate(assignment.dueDate)}</span>
              </div>
            </div>
            <div className="flex gap-2 ml-4">
              {getEffectiveStatus(assignment) === "submitted" ? (
                <Button size="sm" variant="outline">
                  View Submission
                </Button>
              ) : (
                <Button size="sm" onClick={() => openSubmitModal(assignment)}>
                  <Upload className="h-4 w-4 mr-1" />
                  Submit
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleDownload(assignment.fileUrl, assignment.title)
                }
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading assignments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <h1 className="text-2xl font-bold">My Assignments</h1>

              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <Input
                  type="text"
                  placeholder="Search by title or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-xs"
                  spellCheck={false}
                  autoComplete="off"
                />
                <Select
                  value={filterStatus}
                  onValueChange={(value) => setFilterStatus(value)}
                >
                  <SelectTrigger className="min-w-[150px]">
                    {" "}
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid View"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                    aria-label="List View"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {filteredAssignments.length === 0 ? (
            <p className="text-center text-gray-500">No assignments found.</p>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments.map((assignment, index) => (
                <AssignmentCard
                  key={assignment.id?.toString() ?? `assignment-${index}`}
                  assignment={assignment}
                />
              ))}
            </div>
          ) : (
            <div>
              {filteredAssignments.map((assignment, index) => (
                <AssignmentListItem
                  key={assignment.id?.toString() ?? `assignment-${index}`}
                  assignment={assignment}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Modal */}
      {submitModalOpen && selectedAssignment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Submit Assignment: {selectedAssignment.title}
            </h3>

            <input
              type="file"
              onChange={onFileChange}
              className="mb-4"
              accept=".pdf,.doc,.docx,.zip,.rar,.7z"
            />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={closeSubmitModal}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAssignment}
                disabled={!fileToUpload || uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
