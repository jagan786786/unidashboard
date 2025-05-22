"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Schedule = {
  program: string;
  section: string;
  semester: string;
  course: string;
  day: string;
  time: string;
  room: string;
  facultyName: string;
  facultyId: string;
};

export default function ClassSchedule() {
  const [schedule, setSchedule] = useState<Schedule[]>([
    {
      program: "B.Tech CSE",
      section: "A",
      semester: "1st",
      course: "Web Development",
      day: "Monday",
      time: "10:00 AM - 11:00 AM",
      room: "Block A - 101",
      facultyName: "Dr. Anjali Sharma",
      facultyId: "F001",
    },
    {
      program: "B.Tech CSE",
      section: "A",
      semester: "1st",
      course: "Data Structures",
      day: "Wednesday",
      time: "2:00 PM - 3:00 PM",
      room: "Block A - 102",
      facultyName: "Prof. Rajesh Nair",
      facultyId: "F002",
    },
  ]);

  const [formData, setFormData] = useState<Schedule>({
    program: "",
    section: "",
    semester: "",
    course: "",
    day: "",
    time: "",
    room: "",
    facultyName: "",
    facultyId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, formData]);
    setFormData({
      program: "",
      section: "",
      semester: "",
      course: "",
      day: "",
      time: "",
      room: "",
      facultyName: "",
      facultyId: "",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Class Schedule</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">+ Add Schedule</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Schedule</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {[
                { label: "Faculty ID", name: "facultyId" },
                { label: "Faculty Name", name: "facultyName" },
                { label: "Program", name: "program" },
                { label: "Section", name: "section" },
                { label: "Semester", name: "semester" },
                { label: "Course", name: "course" },
                { label: "Day", name: "day" },
                { label: "Time", name: "time" },
                { label: "Room", name: "room" },
              ].map(({ label, name }) => (
                <div className="grid grid-cols-4 items-center gap-4" key={name}>
                  <Label htmlFor={name} className="text-right">
                    {label}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              ))}
              <Button onClick={handleAddSchedule}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {schedule.length === 0 ? (
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
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Day</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Room</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((cls, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="border px-4 py-2">{cls.facultyId}</td>
                    <td className="border px-4 py-2">{cls.facultyName}</td>
                    <td className="border px-4 py-2">{cls.program}</td>
                    <td className="border px-4 py-2">{cls.section}</td>
                    <td className="border px-4 py-2">{cls.semester}</td>
                    <td className="border px-4 py-2">{cls.course}</td>
                    <td className="border px-4 py-2">{cls.day}</td>
                    <td className="border px-4 py-2">{cls.time}</td>
                    <td className="border px-4 py-2">{cls.room}</td>
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
