"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";

type Club = {
  id: number;
  name: string;
  stream: string;
  supervisor?: { name: string };
  teamLead: string;
  coLead: string;
};

export default function StudentClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [formData, setFormData] = useState({
    id: null as number | null,
    name: "",
    stream: "",
    teamLead: "",
    coLead: "",
  });
  const [editing, setEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchClubs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/clubs");
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const handleAddClub = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/clubs",
        formData
      );
      setClubs((prev) => [...prev, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding club:", error);
    }
  };

  const handleEditClub = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/clubs/${formData.id}`,
        formData
      );
      fetchClubs();
      resetForm();
    } catch (error) {
      console.error("Error editing club:", error);
    }
  };

  const handleDeleteClub = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/clubs/${id}`);
      setClubs(clubs.filter((club) => club.id !== id));
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      stream: "",
      teamLead: "",
      coLead: "",
    });
    setEditing(false);
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Clubs</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="flex items-center gap-2"
              onClick={() => {
                resetForm();
                setOpenDialog(true);
              }}
            >
              <Plus className="h-4 w-4" />
              {editing ? "Edit Club" : "Add Club"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Student Club</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Club Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                placeholder="Stream (e.g., CSE, Arts)"
                value={formData.stream}
                onChange={(e) =>
                  setFormData({ ...formData, stream: e.target.value })
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
              <Button onClick={editing ? handleEditClub : handleAddClub}>
                {editing ? "Update" : "Submit"}
              </Button>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell>{club.name}</TableCell>
                    <TableCell>{club.stream}</TableCell>
                    <TableCell>{club.supervisor?.name || "N/A"}</TableCell>
                    <TableCell>{club.teamLead}</TableCell>
                    <TableCell>{club.coLead}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFormData(club);
                          setEditing(true);
                          setOpenDialog(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteClub(club.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
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
