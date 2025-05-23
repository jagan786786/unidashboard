"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

type Announcement = {
  id: number;
  title: string;
  message: string;
  type: "event" | "exam" | "holiday" | "general";
  date: string;
};

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<Announcement["type"]>("general");

  const addAnnouncement = () => {
    if (!title || !message || !type) return;

    const newAnnouncement: Announcement = {
      id: Date.now(),
      title,
      message,
      type,
      date: new Date().toLocaleString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setTitle("");
    setMessage("");
    setType("general");
  };

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Create Announcement</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            value={type}
            onValueChange={(val) => setType(val as Announcement["type"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="holiday">Holiday</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder="Write announcement details here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={addAnnouncement}>Post Announcement</Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Announcements</h2>
        {announcements.length === 0 && (
          <p className="text-gray-500">No announcements yet.</p>
        )}
        {announcements.map((ann) => (
          <Card
            key={ann.id}
            className="border-l-4"
            style={{
              borderColor:
                ann.type === "event"
                  ? "#3b82f6"
                  : ann.type === "exam"
                  ? "#f59e0b"
                  : ann.type === "holiday"
                  ? "#10b981"
                  : "#64748b",
            }}
          >
            <CardContent className="py-4">
              <h3 className="text-lg font-bold">{ann.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                {ann.message}
              </p>
              <p className="text-xs text-gray-400">
                {ann.type.toUpperCase()} • {ann.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
