"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const facultySections = [
  {
    id: "SEC001",
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Web Development",
  },
  {
    id: "SEC002",
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Data Structures",
  },
];

export default function SectionList() {
  const router = useRouter();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {facultySections.map((sec) => (
        <Card
          key={sec.id}
          className="border border-muted dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors"
        >
          <CardHeader>
            <CardTitle className="dark:text-white">{sec.course}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
              {sec.program} - Section {sec.section}, Semester {sec.semester}
            </p>
            <div className="flex gap-2">
              <Link href={`/dashboard/sections/${sec.id}`}>
                <Button variant="secondary" size="sm">
                  View Students
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={() =>
                  router.push(`/dashboard/sections/${sec.id}/assignments`)
                }
              >
                Assign Assignment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
