"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ClassScheduleItem {
  program: string;
  section: string;
  semester: string;
  course: string;
  day: string;
  time: string;
  room: string;
}

interface ClassScheduleProps {
  schedule: ClassScheduleItem[];
}

export default function ClassSchedule({ schedule }: ClassScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Class Schedule</CardTitle>
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
