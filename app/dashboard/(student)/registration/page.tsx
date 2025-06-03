"use client";

import { useState } from "react";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    registrationNo: "",
    department: "",
    rollNo: "",
    amountPaid: "1000",
    duesAmount: "0",
    transactionId: "",
    transactionDate: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const fetchStudentByRollNo = async () => {
    if (!formData.rollNo) return;

    try {
      const res = await fetch(`http://localhost:8080/api/admin/student/${formData.rollNo}`);
      if (!res.ok) throw new Error("Student not found");

      const student = await res.json();

      setFormData((prev) => ({
        ...prev,
        name: student.name || "",
        department: student.department || "",
        registrationNo: student.registrationNo || "", // ✅ Correct assignment
      }));
    } catch (error) {
      alert("Student not found. Please check the roll number.");
      setFormData((prev) => ({
        ...prev,
        name: "",
        department: "",
        registrationNo: "", // ✅ Reset correctly
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("regNo", formData.registrationNo);
    data.append("department", formData.department);
    data.append("rollNo", formData.rollNo);
    data.append("amountPaid", formData.amountPaid);
    data.append("duesAmount", formData.duesAmount);
    data.append("transactionId", formData.transactionId);
    data.append("transactionDate", formData.transactionDate);
    if (formData.file) data.append("file", formData.file);

    try {
      const res = await fetch("http://localhost:8080/api/student/registration", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit form");

      alert("Form submitted successfully!");
      setFormData({
        name: "",
        registrationNo: "",
        department: "",
        rollNo: "",
        amountPaid: "1000",
        duesAmount: "0",
        transactionId: "",
        transactionDate: "",
        file: null,
      });
    } catch (error) {
      console.error(error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">📋 Semester Registration</h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Student Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Roll No.</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              className="w-full p-2 border rounded"
              onChange={handleChange}
              onBlur={fetchStudentByRollNo}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Registration No.</label>
            <input
              type="text"
              name="registrationNo"
              value={formData.registrationNo}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              required
            />
          </div>
        </div>

        {/* Transaction Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount Paid (₹)</label>
            <input
              type="number"
              name="amountPaid"
              className="w-full p-2 border rounded bg-gray-100"
              value={formData.amountPaid}
              readOnly
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dues Amount (₹)</label>
            <input
              type="number"
              name="duesAmount"
              value={formData.duesAmount}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              className="w-full p-2 border rounded"
              value={formData.transactionId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Transaction Date</label>
            <input
              type="date"
              name="transactionDate"
              className="w-full p-2 border rounded"
              value={formData.transactionDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Payment Receipt (Image)</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="w-full"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:opacity-90">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
