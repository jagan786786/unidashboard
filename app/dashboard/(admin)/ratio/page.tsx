"use client";

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
import { Label } from "@/components/ui/label";
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
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";

type DepartmentData = {
  department: string;
  students: number;
  faculty: number;
};

const initialData: Record<string, DepartmentData[]> = {
  "2023": [
    { department: "Computer Science", students: 800, faculty: 40 },
    { department: "Electrical Eng.", students: 600, faculty: 35 },
  ],
  "2024": [
    { department: "Computer Science", students: 850, faculty: 42 },
    { department: "Electrical Eng.", students: 620, faculty: 36 },
  ],
  "2025": [
    { department: "Computer Science", students: 870, faculty: 45 },
    { department: "Electrical Eng.", students: 640, faculty: 37 },
  ],
};

export default function StudentFacultyRatioPage() {
  const [year, setYear] = useState("2025");
  const [dataByYear, setDataByYear] = useState(initialData);
  const [form, setForm] = useState({
    department: "",
    students: "",
    faculty: "",
    year: "",
  });

  const handleAdd = () => {
    const newDept: DepartmentData = {
      department: form.department,
      students: parseInt(form.students),
      faculty: parseInt(form.faculty),
    };

    const entryYear = form.year.trim();

    if (!entryYear) return;

    const updated = {
      ...dataByYear,
      [entryYear]: [...(dataByYear[entryYear] || []), newDept],
    };

    setDataByYear(updated);
    setYear(entryYear); // auto-select the new year
    setForm({ department: "", students: "", faculty: "", year: "" });
  };

  const currentData = dataByYear[year] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-bold">Student to Faculty Ratio</h2>
          <Select onValueChange={setYear} value={year}>
            <SelectTrigger className="w-[120px]">{year}</SelectTrigger>
            <SelectContent>
              {Object.keys(dataByYear).map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Data
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Department Data</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Year</Label>
                <Input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="e.g., 2026"
                />
              </div>
              <div>
                <Label>Department</Label>
                <Input
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Students</Label>
                <Input
                  type="number"
                  value={form.students}
                  onChange={(e) =>
                    setForm({ ...form, students: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Faculty</Label>
                <Input
                  type="number"
                  value={form.faculty}
                  onChange={(e) =>
                    setForm({ ...form, faculty: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAdd} className="w-full">
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department-wise Ratio ({year})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Ratio</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((dept) => {
                const ratio = (dept.students / dept.faculty).toFixed(1);
                let status = "🟢 Balanced";
                if (+ratio > 25) status = "🔴 Overloaded";
                else if (+ratio > 20) status = "🟡 Moderate";

                return (
                  <TableRow
                    key={dept.department + dept.students + dept.faculty}
                  >
                    <TableCell>{dept.department}</TableCell>
                    <TableCell>{dept.students}</TableCell>
                    <TableCell>{dept.faculty}</TableCell>
                    <TableCell>{ratio}:1</TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
