"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample schedule
const schedule = [
  {
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Web Development",
  },
  {
    program: "B.Tech CSE",
    section: "A",
    semester: "1st",
    course: "Data Structures",
  },
];

// Syllabus structured by units and subunits
const syllabusMap: Record<string, { unit: string; topics: string[] }[]> = {
  "Web Development": [
    {
      unit: "Unit 1: HTML & CSS",
      topics: [
        "HTML Elements and Structure",
        "Forms and Inputs",
        "CSS Selectors and Properties",
        "Box Model and Layout",
      ],
    },
    {
      unit: "Unit 2: JavaScript Basics",
      topics: [
        "Variables and Data Types",
        "Functions and Scope",
        "DOM Manipulation",
        "Event Handling",
      ],
    },
    {
      unit: "Unit 3: Frontend with React",
      topics: [
        "JSX and Components",
        "Props and State",
        "Hooks (useState, useEffect)",
        "React Router Basics",
      ],
    },
    {
      unit: "Unit 4: Backend & Deployment",
      topics: [
        "APIs and Fetch",
        "Node.js Basics",
        "Intro to Express.js",
        "Hosting with Vercel / Netlify",
      ],
    },
  ],
  "Data Structures": [
    {
      unit: "Unit 1: Arrays and Strings",
      topics: [
        "Array Operations",
        "Multidimensional Arrays",
        "String Manipulations",
        "Dynamic Arrays (Vectors)",
      ],
    },
    {
      unit: "Unit 2: Linked Lists",
      topics: [
        "Singly Linked Lists",
        "Doubly Linked Lists",
        "Circular Linked Lists",
        "Applications of Linked Lists",
      ],
    },
    {
      unit: "Unit 3: Stacks and Queues",
      topics: [
        "Stack Operations",
        "Infix to Postfix Conversion",
        "Queue and Circular Queue",
        "Priority Queue",
      ],
    },
    {
      unit: "Unit 4: Trees and Graphs",
      topics: [
        "Binary Trees and Traversals",
        "Binary Search Tree",
        "Graph Representations",
        "DFS and BFS Algorithms",
      ],
    },
  ],
};

export default function Courses() {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const handleViewDetails = (course: string) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  return (
    <>
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
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((cls, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="border px-4 py-2">{cls.program}</td>
                      <td className="border px-4 py-2">{cls.section}</td>
                      <td className="border px-4 py-2">{cls.semester}</td>
                      <td className="border px-4 py-2">{cls.course}</td>
                      <td className="border px-4 py-2">
                        <Button
                          size="sm"
                          onClick={() => handleViewDetails(cls.course)}
                        >
                          View Details
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

      {/* Modal / Dialog for Syllabus */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Syllabus: {selectedCourse}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 text-sm">
            {selectedCourse &&
              syllabusMap[selectedCourse]?.map((unit, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold mb-1 text-foreground">
                    {unit.unit}
                  </h4>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {unit.topics.map((topic, tidx) => (
                      <li key={tidx}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
