"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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

const BACKEND_URL = "http://localhost:8080/api/admin";

export default function FacultyPublicationsPage() {
  const [facultyList, setFacultyList] = useState<FacultyPublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    department: string;
    publications: string;
    topic: string;
    stream: string;
    report: string | File;
  }>({
    name: "",
    department: "",
    publications: "",
    topic: "",
    stream: "",
    report: "",
  });

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/publications`);
      setFacultyList(res.data);
    } catch (err) {
      console.error("Error fetching publications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleSubmit = async () => {
    try {
      let reportUrl = formData.report;

      // Upload report if it's a File object
      if (formData.report instanceof File) {
        const data = new FormData();
        data.append("file", formData.report);
        const uploadRes = await axios.post(`${BACKEND_URL}/publications/upload`, data);
        reportUrl = uploadRes.data;
      }

      const payload = {
        ...formData,
        publications: Number(formData.publications),
        report: reportUrl,
      };

      if (editingId) {
        await axios.put(`${BACKEND_URL}/publications/${editingId}`, payload);
      } else {
        await axios.post(`${BACKEND_URL}/publications`, payload);
      }

      setFormData({
        name: "",
        department: "",
        publications: "",
        topic: "",
        stream: "",
        report: "",
      });
      setEditingId(null);
      fetchPublications();
    } catch (err) {
      console.error("Error submitting publication:", err);
    }
  };

  interface FacultyPublication {
    id: number;
    name: string;
    department: string;
    publications: number | string;
    topic: string;
    stream: string;
    report: string;
  }

  interface FacultyPublicationFormData {
    name: string;
    department: string;
    publications: string;
    topic: string;
    stream: string;
    report: string | File;
  }

  const handleEdit = (publication: FacultyPublication) => {
    setFormData({
      name: publication.name,
      department: publication.department,
      publications: publication.publications.toString(),
      topic: publication.topic,
      stream: publication.stream,
      report: publication.report,
    });
    setEditingId(publication.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/publications/${id}`);
      fetchPublications();
    } catch (err) {
      console.error("Error deleting publication:", err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Faculty Publications</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {editingId ? "Edit Publication" : "Add Publication"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Publication" : "Add Faculty Publication"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Faculty Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                placeholder="Department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <Input
                type="number"
                placeholder="No. of Publications"
                value={formData.publications}
                onChange={(e) => setFormData({ ...formData, publications: e.target.value })}
              />
              <Input
                placeholder="Publication Topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
              <Input
                placeholder="Stream"
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
              />
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    report: e.target.files?.[0] ?? "",
                  })
                }
              />
              <Button onClick={handleSubmit}>
                {editingId ? "Update" : "Submit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publication List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading publications...</div>
          ) : (
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
                    <TableHead>Actions</TableHead>
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
                      <TableCell className="space-x-2">
                        <Button variant="outline" onClick={() => handleEdit(faculty)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(faculty.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
