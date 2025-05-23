"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function FacultyPublicationsPage() {
  const [facultyList, setFacultyList] = useState([
    {
      name: "Dr. A. Sharma",
      department: "CSE",
      publications: 45,
      topic: "AI in Education",
      stream: "Computer Science",
      report: "https://example.com/report1.pdf",
    },
    {
      name: "Dr. M. Khan",
      department: "ECE",
      publications: 32,
      topic: "Signal Processing",
      stream: "Electronics",
      report: "https://example.com/report2.pdf",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    publications: "",
    topic: "",
    stream: "",
    report: "",
  });

  const handleAddFaculty = () => {
    setFacultyList([
      ...facultyList,
      {
        ...formData,
        publications: Number(formData.publications),
      },
    ]);
    setFormData({
      name: "",
      department: "",
      publications: "",
      topic: "",
      stream: "",
      report: "",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faculty Publications</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Publication
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Faculty Publication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Faculty Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="No. of Publications"
                value={formData.publications}
                onChange={(e) =>
                  setFormData({ ...formData, publications: e.target.value })
                }
              />
              <Input
                placeholder="Publication Topic"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
              />
              <Input
                placeholder="Stream"
                value={formData.stream}
                onChange={(e) =>
                  setFormData({ ...formData, stream: e.target.value })
                }
              />
              <Input
                placeholder="Report Link"
                value={formData.report}
                onChange={(e) =>
                  setFormData({ ...formData, report: e.target.value })
                }
              />
              <Button onClick={handleAddFaculty}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publication List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Publications</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Stream</TableHead>
                  <TableHead>Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facultyList.map((faculty, index) => (
                  <TableRow key={index}>
                    <TableCell>{faculty.name}</TableCell>
                    <TableCell>{faculty.department}</TableCell>
                    <TableCell>{faculty.publications}</TableCell>
                    <TableCell>{faculty.topic}</TableCell>
                    <TableCell>{faculty.stream}</TableCell>
                    <TableCell>
                      <a
                        href={faculty.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
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
