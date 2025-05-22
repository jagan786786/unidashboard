"use client";

import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const dummyStudents = {
  SEC001: [
    { roll: "BT001", name: "Alice" },
    { roll: "BT002", name: "Bob" },
  ],
  SEC002: [
    { roll: "BT003", name: "Charlie" },
    { roll: "BT004", name: "David" },
  ],
};

export default function SectionDetails() {
  const { sectionId } = useParams();
  const students = dummyStudents[sectionId as keyof typeof dummyStudents] || [];

  return (
    <Card className="border border-muted dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold dark:text-white">
          Students in Section {sectionId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="text-muted-foreground dark:text-gray-400">
            No students found for this section.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-auto border border-muted dark:border-gray-700">
              <thead className="bg-muted dark:bg-gray-800 text-left">
                <tr>
                  <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">Roll No</th>
                  <th className="border px-4 py-2 dark:border-gray-700 dark:text-white">Name</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.roll} className="hover:bg-muted/30 dark:hover:bg-gray-700">
                    <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                      {student.roll}
                    </td>
                    <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                      {student.name}
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
