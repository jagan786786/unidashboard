"use client";

import { useEffect, useState } from "react";
import ClassSchedule from "@/components/ClassSchedule";

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const token = localStorage.getItem("token"); // or sessionStorage
      const facultyId = localStorage.getItem("userid"); // or sessionStorage
      if (!facultyId) return;

      try {
        const res = await fetch(
          `http://localhost:8080/api/schedules/faculty?facultyId=${facultyId}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`, // if needed
          //   },
          // }
        );
        const data = await res.json();
        setSchedule(data);
      } catch (err) {
        console.error("Failed to fetch schedule", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) return <p>Loading schedule...</p>;

  return (
    <div className="p-6">
      <ClassSchedule schedule={schedule} />
    </div>
  );
}
