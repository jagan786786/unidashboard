"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const proctorMeetData = [
  {
    name: "ProctorMeet - 8",
    date: "08-Apr-2025",
    time: "10:30 AM",
    proctorReview: "",
    studentReview: "Thank you sir. Feel good to",
  },
  {
    name: "ProctorMeet - 7",
    date: "13-Mar-2025",
    time: "10:30 AM",
    proctorReview: "",
    studentReview: "Thank you sir",
  },
  // Add more as needed...
];

export default function ProctorMeetingPage() {
  const router = useRouter();
  const [selectedMeet, setSelectedMeet] = useState<any | null>(null);
  const [proctorReview, setProctorReview] = useState("");

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          📋 Faculty Proctor Meetings
        </h2>

        <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2">Proctor Meet</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Student Review</th>
                <th className="px-4 py-2">Proctor Review</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {proctorMeetData.map((meet, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 dark:border-gray-700 even:bg-gray-50 dark:even:bg-gray-800"
                >
                  <td className="px-4 py-2">{meet.name}</td>
                  <td className="px-4 py-2">{meet.date}</td>
                  <td className="px-4 py-2">{meet.time}</td>
                  <td className="px-4 py-2">{meet.studentReview}</td>
                  <td className="px-4 py-2">
                    {meet.proctorReview ? (
                      meet.proctorReview
                    ) : (
                      <em className="text-gray-400">Pending</em>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedMeet(meet);
                        setProctorReview(meet.proctorReview || "");
                      }}
                      className="bg-black dark:bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-800"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <button
            onClick={() => router.back()}
            className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800"
          >
            Go back
          </button>
        </div>

        {/* Modal */}
        {selectedMeet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white w-full max-w-lg p-6 rounded shadow-lg border dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Proctor Review Entry</h3>
                <button
                  onClick={() => setSelectedMeet(null)}
                  className="text-xl text-gray-500 dark:text-gray-300"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Meet</label>
                  <input
                    disabled
                    className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-700"
                    value={selectedMeet.name}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    disabled
                    className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-700"
                    value={selectedMeet.date}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <input
                    disabled
                    className="w-full px-2 py-1 border rounded bg-gray-100 dark:bg-gray-700"
                    value={selectedMeet.time}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">
                  Student's Feedback
                </label>
                <textarea
                  disabled
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  value={selectedMeet.studentReview}
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Your Review</label>
                <textarea
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
                  value={proctorReview}
                  onChange={(e) => setProctorReview(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMeet(null)}
                  className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // You can replace this with a real API call
                    alert(
                      `Review submitted for ${selectedMeet.name}:\n${proctorReview}`
                    );
                    setSelectedMeet(null);
                  }}
                  className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 dark:hover:bg-gray-600 dark:bg-gray-700"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
