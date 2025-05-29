"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Pen, Trash } from "lucide-react";

type Schedule = {
  program: string;
  branch: string;
  section: string;
  semester: string;
  courseName: string;
  day: string;
  time: string;
  room: string;
  facultyName: string;
  facultyId: string;
};

export default function ClassSchedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [room, setRoom] = useState("Block A - 101");

  const [formData, setFormData] = useState<Schedule>({
    program: "",
    branch: "",
    section: "",
    semester: "",
    courseName: "",
    day: "",
    time: "",
    room: room,
    facultyName: "",
    facultyId: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch schedules on mount
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/schedules");
      if (!res.ok) throw new Error("Failed to fetch schedules");
      const data = await res.json();
      setSchedule(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8080/api/schedules/autogenerate?room=${encodeURIComponent(
          room
        )}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to generate schedule");
      const data = await res.json();
      setSchedule(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open dialog for new schedule
  const handleAddNew = () => {
    setFormData({
      program: "",
      branch: "",
      section: "",
      semester: "",
      courseName: "",
      day: "",
      time: "",
      room: room,
      facultyName: "",
      facultyId: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
    setDialogOpen(true);
  };

  // Save schedule from form
  const handleAddOrUpdateSchedule = () => {
    if (isEditMode && editIndex !== null) {
      const updated = [...schedule];
      updated[editIndex] = formData;
      setSchedule(updated);
    } else {
      setSchedule([...schedule, formData]);
    }

    setFormData({
      program: "",
      branch: "",
      section: "",
      semester: "",
      courseName: "",
      day: "",
      time: "",
      room: room,
      facultyName: "",
      facultyId: "",
    });
    setIsEditMode(false);
    setEditIndex(null);
    setDialogOpen(false);
  };

  const handleEdit = (idx: number) => {
    setFormData(schedule[idx]);
    setEditIndex(idx);
    setIsEditMode(true);
    setDialogOpen(true);
  };

const handleDelete = async (idx: number) => {
  const scheduleToDelete = schedule[idx];

  if (!confirm("Are you sure you want to delete this schedule?")) return;

  try {
    const res = await fetch(`http://localhost:8080/api/schedules/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleToDelete), // Send schedule as body
    });

    if (!res.ok) throw new Error("Failed to delete schedule");

    const updated = [...schedule];
    updated.splice(idx, 1);
    setSchedule(updated);
  } catch (err) {
    alert("Error deleting schedule.");
    console.error(err);
  }
};


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Class Schedule</CardTitle>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="room" className="font-semibold">
              Room:
            </Label>
            <Input
              id="room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleAutoGenerate} disabled={loading}>
              {loading ? "Generating..." : "Auto Generate Schedule"}
            </Button>
            <Button onClick={fetchSchedules} disabled={loading}>
              Refresh Schedule
            </Button>
            
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading && schedule.length === 0 ? (
          <p>Loading schedules...</p>
        ) : schedule.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            You have no assigned classes.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border">
              <thead className="bg-muted text-left text-foreground">
                <tr>
                  <th className="border px-4 py-2">Faculty ID</th>
                  <th className="border px-4 py-2">Faculty Name</th>
                  <th className="border px-4 py-2">Program</th>
                  <th className="border px-4 py-2">Branch</th>
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Room</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {schedule.map((cls, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="border px-4 py-2">{cls.facultyId}</td>
                    <td className="border px-4 py-2">{cls.facultyName}</td>
                    <td className="border px-4 py-2">{cls.program}</td>
                    <td className="border px-4 py-2">{cls.branch}</td>
                    <td className="border px-4 py-2">{cls.section}</td>
                    <td className="border px-4 py-2">{cls.semester}</td>
                    <td className="border px-4 py-2">{cls.courseName}</td>
                    <td className="border px-4 py-2">{cls.day}</td>
                    <td className="border px-4 py-2">{cls.time}</td>
                    <td className="border px-4 py-2">{cls.room}</td>
                    <td className="border px-4 py-2 flex flex-row">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(idx)}
                      >
                        <Pen size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(idx)}
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

  
    </Card>
  );
}
