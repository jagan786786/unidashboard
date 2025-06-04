"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  EyeClosed,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type FeeType = {
  id: number;
  feeName: string;
  category: string;
  amount: number;
  program: string;
  branch: string;
  academicYear: string;
  status: string;
  lastModified: string;
};

export default function FeesAdminPage() {
  const [fees, setFees] = useState<FeeType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<number | null>(null);
  const [formData, setFormData] = useState<
    Omit<FeeType, "id" | "lastModified">
  >({
    feeName: "",
    category: "",
    amount: 0,
    program: "",
    branch: "",
    academicYear: "",
    status: "Active",
  });
  const router = useRouter();

  const fetchFees = async () => {
    const res = await fetch("http://localhost:8080/api/fees");
    const data = await res.json();
    setFees(data);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (editingFee !== null) {
      await fetch(`http://localhost:8080/api/fees/${editingFee}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("http://localhost:8080/api/fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setIsModalOpen(false);
    fetchFees();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8080/api/fees/${id}`, { method: "DELETE" });
    fetchFees();
  };

  const handleToggleStatus = async (id: number) => {
    const fee = fees.find((f) => f.id === id);
    if (!fee) return;

    const updated = {
      ...fee,
      status: fee.status === "Active" ? "Inactive" : "Active",
    };

    await fetch(`http://localhost:8080/api/fees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    fetchFees();
  };

  const openAddModal = () => {
    setFormData({
      feeName: "",
      category: "",
      amount: 0,
      program: "",
      branch: "",
      academicYear: "",
      status: "Active",
    });
    setEditingFee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const fee = fees.find((f) => f.id === id);
    if (fee) {
      const { id: _id, lastModified, ...rest } = fee;
      setFormData(rest);
      setEditingFee(id);
      setIsModalOpen(true);
    }
  };

  const filteredData = fees.filter((fee) => {
    const matchesSearch =
      fee.feeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.branch.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      fee.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesProgram =
      programFilter === "all" ||
      fee.program.toLowerCase() === programFilter.toLowerCase();
    const matchesBranch =
      branchFilter === "all" ||
      fee.branch.toLowerCase() === branchFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesProgram && matchesBranch;
  });

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  // 👇 Extract unique programs and branches dynamically
  const uniquePrograms = Array.from(new Set(fees.map((f) => f.program))).filter(
    Boolean
  );

  const uniqueBranches = Array.from(new Set(fees.map((f) => f.branch))).filter(
    Boolean
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground">
            Manage academic fees, categories, and pricing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Fee
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fees, programs, or branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Dynamic Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Dynamic Program Filter */}
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {uniquePrograms.map((program) => (
                  <SelectItem key={program} value={program.toLowerCase()}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Dynamic Branch Filter */}
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {uniqueBranches.map((branch) => (
                  <SelectItem key={branch} value={branch.toLowerCase()}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Fee Records ({filteredData.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.feeName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{fee.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      ₹{fee.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{fee.program}</TableCell>
                    <TableCell>{fee.branch}</TableCell>
                    <TableCell>{fee.academicYear}</TableCell>
                    <TableCell>{getStatusBadge(fee.status)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {fee.lastModified}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(fee.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Fee
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(
                                `/dashboard/studentslist?program=${fee.program}&branch=${fee.branch}&academicYear=${fee.academicYear}`
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Students
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(fee.id)}
                          >
                            <span className="mr-2 h-4 w-4">
                              {fee.status === "Active" ? "🛑" : "✅"}
                            </span>
                            {fee.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(fee.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Fee
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No fees found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingFee ? "Edit Fee" : "Add New Fee"}</DialogTitle>
            <DialogDescription>
              {editingFee
                ? "Modify the existing fee details."
                : "Enter new fee information."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fee Name</Label>
                <Input
                  name="feeName"
                  value={formData.feeName}
                  onChange={handleFormChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Program</Label>
                <Input
                  name="program"
                  value={formData.program}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Branch</Label>
                <Input
                  name="branch"
                  value={formData.branch}
                  onChange={handleFormChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Academic Year</Label>
                <Input
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingFee ? "Update Fee" : "Add Fee"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
