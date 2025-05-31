"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import * as XLSX from "xlsx";
import clsx from "clsx";

type Status = "pending" | "verified" | "rejected";

type StudentRegistration = {
  id: number;
  name: string;
  regNo: string;
  department: string;
  amountPaid: number;
  duesAmount: number;
  transactionId: string;
  transactionDate: string;
  receiptUrl: string; // derived from fileName
  status: Status;
};

export default function SemesterRegistrationList() {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [selected, setSelected] = useState<StudentRegistration | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080/api/student/registrations"
        );
        const rawData = await res.json();
        const mappedData = rawData.map((item: any) => ({
          ...item,
          receiptUrl: item.fileName || "", // Map backend fileName to frontend receiptUrl
        }));
        setRegistrations(mappedData);
      } catch (error) {
        console.error("Failed to fetch registrations:", error);
      }
    };
    fetchRegistrations();
  }, []);

  // Update status on backend and frontend
  const handleUpdateStatus = async (status: Status) => {
    if (!selected) return;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/student/registration/update-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selected.id, status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      setRegistrations((prev) =>
        prev.map((reg) => (reg.id === selected.id ? { ...reg, status } : reg))
      );
      setSelected(null);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Status) => {
    const base = "px-2 py-1 text-xs rounded-full";
    switch (status) {
      case "verified":
        return (
          <span className={clsx(base, "bg-green-100 text-green-700")}>
            Verified
          </span>
        );
      case "rejected":
        return (
          <span className={clsx(base, "bg-red-100 text-red-700")}>
            Rejected
          </span>
        );
      default:
        return (
          <span className={clsx(base, "bg-yellow-100 text-yellow-700")}>
            Pending
          </span>
        );
    }
  };

  const activeRegistrations = registrations.filter(
    (reg) => reg.status !== "rejected"
  );
  const rejectedRegistrations = registrations.filter(
    (reg) => reg.status === "rejected"
  );

  const exportToExcel = (data: StudentRegistration[], fileName: string) => {
    const worksheetData = data.map(({ receiptUrl, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, fileName);
  };

  const renderTable = (data: StudentRegistration[]) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Reg. No.</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Amount Paid (₹)</th>
            <th className="border px-4 py-2">Dues (₹)</th>
            <th className="border px-4 py-2">Transaction ID</th>
            <th className="border px-4 py-2">Transaction Date</th>
            <th className="border px-4 py-2">Receipt</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((reg) => (
            <tr key={reg.id}>
              <td className="border px-4 py-2">{reg.name}</td>
              <td className="border px-4 py-2">{reg.regNo}</td>
              <td className="border px-4 py-2">{reg.department}</td>
              <td className="border px-4 py-2">{reg.amountPaid}</td>
              <td className="border px-4 py-2">{reg.duesAmount}</td>
              <td className="border px-4 py-2">{reg.transactionId}</td>
              <td className="border px-4 py-2">{reg.transactionDate}</td>
              <td className="border px-4 py-2">
                {reg.receiptUrl ? (
                  <Image
                    src={reg.receiptUrl}
                    alt="Receipt"
                    width={60}
                    height={60}
                    className="rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No receipt</span>
                )}
              </td>
              <td className="border px-4 py-2">{getStatusBadge(reg.status)}</td>
              <td className="border px-4 py-2">
                <Button size="sm" onClick={() => setSelected(reg)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 space-y-12">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Semester Registration List</h2>
          <Button
            onClick={() =>
              exportToExcel(activeRegistrations, "Active_Registrations.xlsx")
            }
          >
            Export Active
          </Button>
        </div>
        {renderTable(activeRegistrations)}
      </section>

      {rejectedRegistrations.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-600">
              Rejected Registrations
            </h2>
            <Button
              variant="destructive"
              onClick={() =>
                exportToExcel(
                  rejectedRegistrations,
                  "Rejected_Registrations.xlsx"
                )
              }
            >
              Export Rejected
            </Button>
          </div>
          {renderTable(rejectedRegistrations)}
        </section>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>

          {selected && (
            <form className="space-y-1 mt-2 text-sm">
              <div>
                <label className="font-semibold block mb-1">Student Name</label>
                <input
                  type="text"
                  value={selected.name}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">
                  Registration No.
                </label>
                <input
                  type="text"
                  value={selected.regNo}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Department</label>
                <input
                  type="text"
                  value={selected.department}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-semibold block mb-1">
                    Amount Paid
                  </label>
                  <input
                    type="text"
                    value={`₹${selected.amountPaid}`}
                    readOnly
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="font-semibold block mb-1">Dues</label>
                  <input
                    type="text"
                    value={`₹${selected.duesAmount}`}
                    readOnly
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={selected.transactionId}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">
                  Transaction Date
                </label>
                <input
                  type="text"
                  value={selected.transactionDate}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Receipt</label>
                {selected.receiptUrl ? (
                  <Image
                    src={selected.receiptUrl}
                    alt="Receipt"
                    width={250}
                    height={200}
                    className="rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    No receipt uploaded
                  </span>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="default"
                  disabled={loading}
                  onClick={() => handleUpdateStatus("verified")}
                >
                  {loading ? "Approving..." : "Approve"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={loading}
                  onClick={() => handleUpdateStatus("rejected")}
                >
                  {loading ? "Declining..." : "Decline"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
