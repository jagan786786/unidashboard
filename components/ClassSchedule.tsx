"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface ClassScheduleItem {
  program: string;
  branch: string;
  section: string;
  semester: string;
  courseName: string;
  day: string;
  time: string;
  room: string;
}

interface ClassScheduleProps {
  schedule: ClassScheduleItem[];
}

// Helper to group by day
const groupByDay = (schedule: ClassScheduleItem[]) => {
  return schedule.reduce((acc: Record<string, ClassScheduleItem[]>, item) => {
    if (!acc[item.day]) {
      acc[item.day] = [];
    }
    acc[item.day].push(item);
    return acc;
  }, {});
};

export default function ClassSchedule({ schedule }: ClassScheduleProps) {
  const grouped = groupByDay(schedule);

  if (schedule.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            You have no assigned classes.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.keys(grouped).map((day) => (
        <Card key={day}>
          <CardHeader>
            <CardTitle>{day}</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full table-auto text-sm border">
              <thead className="bg-muted text-left text-foreground">
                <tr>
                  <th className="border px-4 py-2">Program</th>
                  <th className="border px-4 py-2">Branch</th>
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Semester</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Room</th>
                </tr>
              </thead>
              <tbody>
                {grouped[day].map((cls, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="border px-4 py-2">{cls.program}</td>
                    <td className="border px-4 py-2">{cls.branch}</td>
                    <td className="border px-4 py-2">{cls.section}</td>
                    <td className="border px-4 py-2">{cls.semester}</td>
                    <td className="border px-4 py-2">{cls.courseName}</td>
                    <td className="border px-4 py-2">{cls.time}</td>
                    <td className="border px-4 py-2">{cls.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
