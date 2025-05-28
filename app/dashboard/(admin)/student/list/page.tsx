"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type Section = {
  id: number;
  program: string;
  branch: string;
  section: string;
  classTeacher: string;
  year?: string;
  semester?: string;
  academicYear?: string;
};

export default function StudentSectionList() {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [academicYears, setAcademicYears] = useState<string[]>([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [newSection, setNewSection] = useState<Omit<Section, "id">>({
    program: "",
    branch: "",
    section: "",
    classTeacher: "",
    year: "",
    semester: "",
    academicYear: "",
  });

  const API_BASE = "http://localhost:8080/api/admin";

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await axios.get(`${API_BASE}/sections`);
      const allSections: Section[] = res.data;
      setSections(allSections);

      const uniqueYears = Array.from(
        new Set(allSections.map((s) => s.academicYear).filter((year): year is string => typeof year === "string" && year.length > 0))
      );
      setAcademicYears(uniqueYears);
      setSelectedAcademicYear(uniqueYears[0] || "");
    } catch (err) {
      console.error("Error fetching sections:", err);
    }
  };

  const handleAddSection = async () => {
    try {
      const res = await axios.post(`${API_BASE}/sections`, newSection);
      setSections((prev) => [...prev, res.data]);
      setNewSection({
        program: "",
        branch: "",
        section: "",
        classTeacher: "",
        year: "",
        semester: "",
        academicYear: "",
      });
      setIsAddOpen(false);
    } catch (err) {
      console.error("Error adding section:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_BASE}/sections/${id}`);
      setSections((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Error deleting section:", err);
    }
  };

  const handleViewEditSave = async () => {
    if (!selectedSection) return;
    try {
      await axios.put(`${API_BASE}/sections/${selectedSection.id}`, selectedSection);
      setSections((prev) =>
        prev.map((s) => (s.id === selectedSection.id ? selectedSection : s))
      );
      setIsViewOpen(false);
      setSelectedSection(null);
    } catch (err) {
      console.error("Error updating section:", err);
    }
  };

  const handleView = (section: Section) => {
    setSelectedSection(section);
    setIsViewOpen(true);
  };

  const handleViewStudents = (section: Section) => {
    router.push(`/dashboard/student/list/${section.id}`);
  };

  const filteredSections = selectedAcademicYear
    ? sections.filter((s) => s.academicYear === selectedAcademicYear)
    : sections;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <div className="flex flex-row gap-10">
          <h2 className="text-2xl font-bold mb-1">Sections</h2>
          <select
            value={selectedAcademicYear}
            onChange={(e) => setSelectedAcademicYear(e.target.value)}
            className="border rounded-md p-2 text-sm dark:bg-gray-800 dark:text-white"
          >
            {academicYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Program"
                value={newSection.program}
                onChange={(e) => setNewSection({ ...newSection, program: e.target.value })}
              />
              <Input
                placeholder="Branch"
                value={newSection.branch}
                onChange={(e) => setNewSection({ ...newSection, branch: e.target.value })}
              />
              <Input
                placeholder="Section"
                value={newSection.section}
                onChange={(e) => setNewSection({ ...newSection, section: e.target.value })}
              />
              <Input
                placeholder="Class Teacher"
                value={newSection.classTeacher}
                onChange={(e) => setNewSection({ ...newSection, classTeacher: e.target.value })}
              />
              <Input
                placeholder="Year"
                value={newSection.year}
                onChange={(e) => setNewSection({ ...newSection, year: e.target.value })}
              />
              <Input
                placeholder="Semester"
                value={newSection.semester}
                onChange={(e) => setNewSection({ ...newSection, semester: e.target.value })}
              />
              <Input
                placeholder="Academic Year"
                value={newSection.academicYear}
                onChange={(e) => setNewSection({ ...newSection, academicYear: e.target.value })}
              />
              <Button className="w-full" onClick={handleAddSection}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto mt-10">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="border px-4 py-2">Program & Branch</th>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Class Teacher</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Semester</th>
              <th className="border px-4 py-2">Academic Year</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSections.map((section) => (
              <tr
                key={section.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border px-4 py-2">
                  {section.program} - {section.branch}
                </td>
                <td className="border px-4 py-2">{section.section}</td>
                <td className="border px-4 py-2">{section.classTeacher}</td>
                <td className="border px-4 py-2">{section.year || "-"}</td>
                <td className="border px-4 py-2">{section.semester || "-"}</td>
                <td className="border px-4 py-2">{section.academicYear || "-"}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Button size="sm" onClick={() => handleViewStudents(section)}>
                    View Students
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleView(section)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(section.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View / Edit Section</DialogTitle>
          </DialogHeader>
          {selectedSection && (
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Program"
                value={selectedSection.program}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, program: e.target.value })
                }
              />
              <Input
                placeholder="Branch"
                value={selectedSection.branch}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, branch: e.target.value })
                }
              />
              <Input
                placeholder="Section"
                value={selectedSection.section}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, section: e.target.value })
                }
              />
              <Input
                placeholder="Class Teacher"
                value={selectedSection.classTeacher}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, classTeacher: e.target.value })
                }
              />
              <Input
                placeholder="Year"
                value={selectedSection.year || ""}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, year: e.target.value })
                }
              />
              <Input
                placeholder="Semester"
                value={selectedSection.semester || ""}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, semester: e.target.value })
                }
              />
              <Input
                placeholder="Academic Year"
                value={selectedSection.academicYear || ""}
                onChange={(e) =>
                  setSelectedSection({ ...selectedSection, academicYear: e.target.value })
                }
              />
              <Button className="w-full" onClick={handleViewEditSave}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
