"use client";

import { useEffect, useState } from "react";
import { Search, Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Certificate = {
  id: number;
  name: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  uploadDate: string;
  fileUrl: string;
  studentName: string;
  studentRollNo: string;
};

export default function StudentCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    try {
      const res = await fetch("http://localhost:8080/api/certificates/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to fetch certificates", error);
        return;
      }

      const data = await res.json();
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates", error);
    }
  }

  async function handleUpdateStatus(
    certId: number,
    status: "approve" | "reject"
  ) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/certificates/${certId}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.text();
        console.error("Failed to update status", error);
        return;
      }

      await fetchCertificates();
    } catch (error) {
      console.error("Error updating certificate status", error);
    }
  }

  const filtered = certificates.filter((c) => {
    const matchesSearch =
      (c.studentName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (c.studentRollNo?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (c.type?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "all" || c.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: "approved" | "rejected" | "pending") => {
    const mapping = {
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${mapping[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Certificate Approvals
      </h1>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Filter by student, type, or status</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by student, roll no, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>
                Showing {filtered.length} of {certificates.length}
              </CardDescription>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      {c.studentName} ({c.studentRollNo})
                    </TableCell>
                    <TableCell>{c.type}</TableCell>
                    <TableCell>{c.uploadDate}</TableCell>
                    <TableCell>{statusBadge(c.status)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>
                              {c.studentName} — {c.type}
                            </DialogTitle>
                            <DialogHeader>
                              
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                Status: {statusBadge(c.status)}
                              </div>
                            </DialogHeader>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <img
                              src={c.fileUrl}
                              alt={c.type}
                              className="w-full max-h-[400px] object-contain border rounded"
                            />
                            <div className="space-x-2">
                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={c.status === "rejected"}
                                onClick={() =>
                                  handleUpdateStatus(c.id, "reject")
                                }
                              >
                                Reject
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                disabled={c.status === "approved"}
                                onClick={() =>
                                  handleUpdateStatus(c.id, "approve")
                                }
                              >
                                Approve
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
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
