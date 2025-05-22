"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DuesPage() {
  const duesData = {
    student: "DAMALU KARTIK , MBA , MBA , 2 , B",
    syncDate: "19-Apr-2025",
    academicDue: "0 (19-Apr-2025)",
    otherDue: "0 (0)",
  };

  const router = useRouter();
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle> Due Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded p-4 text-sm text-gray-700 dark:text-gray-200">
            <div className="mb-2">
              <strong>Student Details:</strong> {duesData.student}
            </div>
            <div className="mb-2">
              <strong>Sync Date:</strong> {duesData.syncDate}
            </div>
            <div className="mb-2">
              <strong>Academic Due (Due up to):</strong> {duesData.academicDue}
            </div>
            <div>
              <strong>Other Due (Due up to):</strong> {duesData.otherDue}
            </div>
          </div>

          <button className="bg-black dark:bg-gray-800  text-white px-4 py-2 rounded shadow" onClick={()=>router.back()} >
            Go back!
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
