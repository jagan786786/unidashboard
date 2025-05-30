"use client";

import { useEffect, useState } from "react";
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

  // Load announcements on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch((err) => console.error("Failed to fetch announcements", err));
  }, []);

  const addAnnouncement = () => {
    if (!title || !message || !type) return;

    const newAnnouncement = {
      title,
      message,
      type,
    };

    fetch("http://localhost:8080/api/admin/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnnouncement),
    })
      .then((res) => res.json())
      .then((created) => {
        setAnnouncements([created, ...announcements]);
        setTitle("");
        setMessage("");
        setType("general");
      })
      .catch((err) => console.error("Failed to post announcement", err));
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
                {ann.type.toUpperCase()} •{" "}
                {new Date(ann.date).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
