"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const scheduleData = [
  {
    program: "B.Tech",
    section: "A",
    subject: "Data Structures",
    day: "Monday",
    time: "10:00 AM - 11:00 AM",
  },
  {
    program: "BCA",
    section: "B",
    subject: "Web Programming",
    day: "Tuesday",
    time: "12:00 PM - 1:00 PM",
  },
  {
    program: "M.Tech",
    section: "C",
    subject: "AI & ML",
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
  },
];

const dummyStudents = [
  { roll: "BT001", name: "Alice", contact: "9876543210", present: false },
  { roll: "BT002", name: "Bob", contact: "9876543211", present: false },
  { roll: "BT003", name: "Charlie", contact: "9876543212", present: false },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState<
    (typeof scheduleData)[0] | null
  >(null);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState(dummyStudents);
  const [noOfClasses, setNoOfClasses] = useState(1);

  const handleCheckboxChange = (index: number) => {
    const updated = [...students];
    updated[index].present = !updated[index].present;
    setStudents(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted attendance:", {
      class: selectedClass,
      noOfClasses,
      students: students.filter((s) => s.present),
    });
    setOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm border border-gray-300 dark:border-gray-700">
              <thead className="bg-muted text-left dark:bg-gray-800 dark:text-gray-200">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Program
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Section
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Subject
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Day
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Time
                  </th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {row.program}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {row.section}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {row.subject}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {row.day}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      {row.time}
                    </td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedClass(row);
                          setOpen(true);
                        }}
                      >
                        Mark Attendance
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>Attendance Form</DialogTitle>
          </DialogHeader>

          {selectedClass && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Info Form */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Class Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Program
                    </label>
                    <input
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={selectedClass.program}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Section
                    </label>
                    <input
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={selectedClass.section}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={selectedClass.subject}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Day
                    </label>
                    <input
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={selectedClass.day}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Time
                    </label>
                    <input
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      value={selectedClass.time}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      No. of Classes
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      onChange={(e) =>
                        setNoOfClasses(Math.max(1, Number(e.target.value)))
                      }
                      defaultValue={noOfClasses}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Student List Section */}
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Student List</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-[300px]">
                    <table className="w-full text-sm table-auto border border-gray-300 dark:border-gray-700">
                      <thead className="bg-muted dark:bg-gray-700 dark:text-gray-200">
                        <tr>
                          <th className="px-2 py-1 border border-gray-300 dark:border-gray-700">
                            Roll No
                          </th>
                          <th className="px-2 py-1 border border-gray-300 dark:border-gray-700">
                            Name
                          </th>
                          <th className="px-2 py-1 border border-gray-300 dark:border-gray-700">
                            Contact
                          </th>
                          <th className="px-2 py-1 border border-gray-300 dark:border-gray-700">
                            Present
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => (
                          <tr
                            key={student.roll}
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          >
                            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">
                              {student.roll}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">
                              {student.name}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">
                              {student.contact}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-center">
                              <Checkbox
                                checked={student.present}
                                onCheckedChange={() =>
                                  handleCheckboxChange(index)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button className="mt-4 w-full">Submit Attendance</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
