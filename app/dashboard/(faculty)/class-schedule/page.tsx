"use client";

import ClassSchedule from "@/components/ClassSchedule";

// Example data
const dummySchedule = [
  {
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Web Development",
    day: "Monday",
    time: "10:00 AM - 11:00 AM",
    room: "Block A - 101",
  },
  {
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Data Structures",
    day: "Wednesday",
    time: "2:00 PM - 3:00 PM",
    room: "Block A - 102",
  },
];

export default function SchedulePage() {
  return (
    <div className="p-6">
      <ClassSchedule schedule={dummySchedule} />
    </div>
  );
}
