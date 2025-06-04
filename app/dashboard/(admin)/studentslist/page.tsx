"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  SortAsc,
  SortDesc,
  Download,
  RefreshCw,
  Users,
  GraduationCap,
  Mail,
  Hash,
  Eye,
  AlertCircle,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

type Student = {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  phone?: string;
  address?: string;
  hosteller?: boolean;
  totalFees?: number;
};

type SortOption = "name" | "rollNo" | "email";
type SortOrder = "asc" | "desc";

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const program = searchParams.get("program") || "";
  const branch = searchParams.get("branch") || "";
  const academicYear = searchParams.get("academicYear") || "";

  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const query = new URLSearchParams({ program, branch, academicYear });
      const res = await fetch(
        `http://localhost:8080/api/admin/students?${query}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch students: ${res.statusText}`);
      }

      const data = await res.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [program, branch, academicYear]);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    setFilteredStudents(filtered);
  }, [students, searchQuery, sortBy, sortOrder]);

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Roll Number", "Email"];
    const csvContent = [
      headers.join(","),
      ...filteredStudents.map((student) =>
        [student.id, student.name, student.rollNo, student.email].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students-${program}-${branch}-${academicYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleHostelToggle = async (
    studentId: number,
    isHosteller: boolean
  ) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/students/${studentId}/hostel-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hosteller: isHosteller, academicYear }),
        }
      );

      if (!res.ok) throw new Error("Failed to update hostel status");

      const updatedStudent = await res.json();

      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? {
                ...s,
                hosteller: isHosteller,
                totalFees: updatedStudent.totalFees,
              }
            : s
        )
      );
    } catch (err) {
      console.error(err);
      alert("Unable to update hostel status.");
    }
  };

  const StudentSkeleton = () => (
    <Card className="shadow-sm border rounded-xl">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      </CardContent>
    </Card>
  );

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={fetchStudents} className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="w-8 h-8" />
            Students
          </h1>
          <p className="text-muted-foreground mt-1">
            Program: <strong>{program}</strong> | Branch:{" "}
            <strong>{branch}</strong> | Year: <strong>{academicYear}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchStudents} disabled={loading}>
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Go Back
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search students by name, roll number, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="rollNo">Sort by Roll No</SelectItem>
              <SelectItem value="email">Sort by Email</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={filteredStudents.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Student List */}
      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <StudentSkeleton key={i} />)
        ) : filteredStudents.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No students found</p>
            <p className="text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "No students match the selected criteria"}
            </p>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card
              key={student.id}
              className="shadow-sm border rounded-xl hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-base">{student.name}</p>
                      <Badge variant="secondary" className="text-xs">
                        #{student.id}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        {student.rollNo}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {student.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            Student Details
                          </DialogTitle>
                        </DialogHeader>
                        {selectedStudent && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Name
                                </label>
                                <p className="font-medium">
                                  {selectedStudent.name}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Student ID
                                </label>
                                <p className="font-medium">
                                  #{selectedStudent.id}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Roll Number
                                </label>
                                <p className="font-medium">
                                  {selectedStudent.rollNo}
                                </p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Email
                                </label>
                                <p className="font-medium text-sm">
                                  {selectedStudent.email}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Program Details
                                </label>
                                <p className="font-medium">
                                  {program} - {branch}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Academic Year: {academicYear}
                                </p>
                              </div>
                            </div>
                            {selectedStudent.phone && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Phone
                                </label>
                                <p className="font-medium">
                                  {selectedStudent.phone}
                                </p>
                              </div>
                            )}
                            {selectedStudent.address && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                  Address
                                </label>
                                <p className="font-medium">
                                  {selectedStudent.address}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`hosteller-${student.id}`}
                        className="text-sm"
                      >
                        Hosteller
                      </label>
                      <Switch
                        id={`hosteller-${student.id}`}
                        checked={student.hosteller}
                        onCheckedChange={(checked) =>
                          handleHostelToggle(student.id, checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {!loading && filteredStudents.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {students.length} students
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}
    </div>
  );
}
