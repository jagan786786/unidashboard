"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default function StudentClubsPage() {
  const [clubs, setClubs] = useState([
    {
      name: "Tech Innovators",
      stream: "CSE",
      supervisor: "Dr. R. Mehta",
      teamLead: "Aryan Verma",
      coLead: "Riya Singh",
    },
    {
      name: "Eco Warriors",
      stream: "Environmental",
      supervisor: "Dr. L. Iyer",
      teamLead: "Sahil Nanda",
      coLead: "Divya Patel",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    stream: "",
    supervisor: "",
    teamLead: "",
    coLead: "",
  });

  const handleAddClub = () => {
    setClubs([...clubs, formData]);
    setFormData({
      name: "",
      stream: "",
      supervisor: "",
      teamLead: "",
      coLead: "",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Clubs</h1>
        <Dialog>
          <DialogTrigger asChild>
             <Button type="button" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Club
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Student Club</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Club Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Input
                placeholder="Stream (e.g., CSE, Arts)"
                value={formData.stream}
                onChange={(e) =>
                  setFormData({ ...formData, stream: e.target.value })
                }
              />
              <Input
                placeholder="Supervisor Name"
                value={formData.supervisor}
                onChange={(e) =>
                  setFormData({ ...formData, supervisor: e.target.value })
                }
              />
              <Input
                placeholder="Team Lead"
                value={formData.teamLead}
                onChange={(e) =>
                  setFormData({ ...formData, teamLead: e.target.value })
                }
              />
              <Input
                placeholder="Co-lead"
                value={formData.coLead}
                onChange={(e) =>
                  setFormData({ ...formData, coLead: e.target.value })
                }
              />
              <Button onClick={handleAddClub}>Submit</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Club List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club Name</TableHead>
                  <TableHead>Stream</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Team Lead</TableHead>
                  <TableHead>Co-lead</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.map((club, index) => (
                  <TableRow key={index}>
                    <TableCell>{club.name}</TableCell>
                    <TableCell>{club.stream}</TableCell>
                    <TableCell>{club.supervisor}</TableCell>
                    <TableCell>{club.teamLead}</TableCell>
                    <TableCell>{club.coLead}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
