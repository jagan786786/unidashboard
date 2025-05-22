"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function NewAssignmentPage() {
  const { sectionId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duedate, setDuedate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ sectionId, title, description, duedate, file });
    alert("Assignment submitted!");
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 border border-muted shadow-sm dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold dark:text-white">
          Assign New Assignment for Section {sectionId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
            required
          />
          <Textarea
            placeholder="Assignment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
            required
          />
          <div className="grid grid-cols-2 gap-6">
            {" "}
            <Input
              type="date"
              value={duedate}
              onChange={(e) => setDuedate(e.target.value)}
              className="dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
              required
            />
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              className="dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <Button type="submit" className="w-full  dark:hover:bg-gray-600 dark:bg-gray-500">
            Assign
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
