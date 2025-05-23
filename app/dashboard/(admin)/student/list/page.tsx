"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

type Section = {
  id: number;
  program: string;
  branch: string;
  section: string;
  classTeacher: string;
};

export default function StudentSectionList() {
  const router = useRouter();

  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      program: "B.Tech",
      branch: "Computer Science",
      section: "A",
      classTeacher: "Dr. Sharma",
    },
    {
      id: 2,
      program: "B.Tech",
      branch: "Mechanical Engineering",
      section: "B",
      classTeacher: "Prof. Verma",
    },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [newSection, setNewSection] = useState<Omit<Section, "id">>({
    program: "",
    branch: "",
    section: "",
    classTeacher: "",
  });

  const handleAddSection = () => {
    const id = Date.now();
    setSections([...sections, { id, ...newSection }]);
    setNewSection({ program: "", branch: "", section: "", classTeacher: "" });
    setIsAddOpen(false);
  };

  const handleDelete = (id: number) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const handleView = (section: Section) => {
    setSelectedSection(section);
    setIsViewOpen(true);
  };

  const handleViewEditSave = () => {
    if (!selectedSection) return;
    setSections((prev) =>
      prev.map((s) => (s.id === selectedSection.id ? selectedSection : s))
    );
    setIsViewOpen(false);
  };

  const handleViewStudents = (section: Section) => {
    router.push(`/dashboard/student/list/${section.section}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sections</h2>

        {/* Add Section Modal */}
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
            <div className="space-y-3 mt-4">
              <Input
                placeholder="Program"
                value={newSection.program}
                onChange={(e) =>
                  setNewSection({ ...newSection, program: e.target.value })
                }
              />
              <Input
                placeholder="Branch"
                value={newSection.branch}
                onChange={(e) =>
                  setNewSection({ ...newSection, branch: e.target.value })
                }
              />
              <Input
                placeholder="Section"
                value={newSection.section}
                onChange={(e) =>
                  setNewSection({ ...newSection, section: e.target.value })
                }
              />
              <Input
                placeholder="Class Teacher"
                value={newSection.classTeacher}
                onChange={(e) =>
                  setNewSection({
                    ...newSection,
                    classTeacher: e.target.value,
                  })
                }
              />
              <Button className="w-full" onClick={handleAddSection}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="border px-4 py-2">Program & Branch</th>
              <th className="border px-4 py-2">Section</th>
              <th className="border px-4 py-2">Class Teacher</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr
                key={section.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="border px-4 py-2">
                  {section.program} - {section.branch}
                </td>
                <td className="border px-4 py-2">{section.section}</td>
                <td className="border px-4 py-2">{section.classTeacher}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Button size="sm" onClick={() => handleViewStudents(section)}>
                    View Students
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(section)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(section.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View & Edit Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View / Edit Section</DialogTitle>
          </DialogHeader>
          {selectedSection && (
            <div className="space-y-3 mt-4">
              <Input
                placeholder="Program"
                value={selectedSection.program}
                onChange={(e) =>
                  setSelectedSection({
                    ...selectedSection,
                    program: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Branch"
                value={selectedSection.branch}
                onChange={(e) =>
                  setSelectedSection({
                    ...selectedSection,
                    branch: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Section"
                value={selectedSection.section}
                onChange={(e) =>
                  setSelectedSection({
                    ...selectedSection,
                    section: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Class Teacher"
                value={selectedSection.classTeacher}
                onChange={(e) =>
                  setSelectedSection({
                    ...selectedSection,
                    classTeacher: e.target.value,
                  })
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
