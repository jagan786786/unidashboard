"use client";

import { useState } from "react";

export default function FormFillup() {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    department: "",
    amountPaid: "1000",
    duesAmount: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Form submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">📋 Semester Formfillup</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Registration No.
            </label>
            <input
              type="text"
              name="regNo"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Transaction Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount Paid (₹)
            </label>
            <input
              type="number"
              name="amountPaid"
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              value={formData.amountPaid}
              readOnly
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Dues Amount (₹)
            </label>
            <input
              type="number"
              name="duesAmount"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              name="transactionDate"
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Payment Receipt (Image)
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="w-full text-gray-900 dark:text-gray-100"
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded hover:opacity-90"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
