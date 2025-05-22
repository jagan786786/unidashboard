"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const proctorMeetData = [
  {
    name: "ProctorMeet - 8",
    date: "08-Apr-2025",
    time: "10:30 AM",
    proctorReview: "He got internship in Aurobind",
    studentReview: "Thank you sir. Feel good to m",
  },
  {
    name: "ProctorMeet - 7",
    date: "13-Mar-2025",
    time: "10:30 AM",
    proctorReview: "Student said that NO Issues.",
    studentReview: "Thank you sir. For further is",
  },
  {
    name: "ProctorMeet - 6",
    date: "17-Feb-2025",
    time: "10:30 AM",
    proctorReview: "Student said that sometimes b",
    studentReview: "Feel good to meet with procto",
  },
  {
    name: "ProctorMeet - 5",
    date: "24-Jan-2025",
    time: "10:30 AM",
    proctorReview: "Student said that NO ISSUES.",
    studentReview: "Good to meet with proctor sir",
  },
  {
    name: "ProctorMeet - 4",
    date: "29-Nov-2024",
    time: "5:00 PM",
    proctorReview: "Student complain that after 8",
    studentReview: "Thank you sir",
  },
  {
    name: "ProctorMeet - 3",
    date: "24-Oct-2024",
    time: "5:00 PM",
    proctorReview: "Student said that NO Issues.",
    studentReview: "Thank you sir",
  },
  {
    name: "ProctorMeet - 2",
    date: "30-Sep-2024",
    time: "5:00 PM",
    proctorReview: "Student said that NO ISSUES.",
    studentReview: "Thank you sir",
  },
  {
    name: "ProctorMeet - 1",
    date: "12-Sep-2024",
    time: "5:00 PM",
    proctorReview: "Student shared that he is B.S",
    studentReview: "Thank you sir for your concer",
  },
];

export default function ProctorMeetingPage() {
  const router = useRouter();
  const [selectedMeet, setSelectedMeet] = useState<any | null>(null);
  const [studentResponse, setStudentResponse] = useState("");

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">👨‍🏫 Proctor Meet</h2>
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm text-left bg-white dark:bg-gray-900 border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-900 text-black">
              <tr>
                <th className="px-4 py-2">Proctor Meet</th>
                <th className="px-4 py-2">Schedule Date</th>
                <th className="px-4 py-2">Schedule Time</th>
                <th className="px-4 py-2">Proctor Review</th>
                <th className="px-4 py-2">Student Review</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {proctorMeetData.map((meet, idx) => (
                <tr
                  key={idx}
                  className="border-b even:bg-gray-50 dark:even:bg-gray-800"
                >
                  <td className="px-4 py-2">{meet.name}</td>
                  <td className="px-4 py-2">{meet.date}</td>
                  <td className="px-4 py-2">{meet.time}</td>
                  <td className="px-4 py-2">{meet.proctorReview}</td>
                  <td className="px-4 py-2">{meet.studentReview}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedMeet(meet);
                        setStudentResponse(meet.studentReview || "");
                      }}
                      className="bg-black dark:odd:bg-gray-800 text-white px-3 py-1 rounded  text-xs"
                    >
                      Action 
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
            className="bg-black dark:bg-gray-800 text-white px-4 py-2 rounded shadow"
          >
            Go back!
          </button>
        </div>

        {/* Modal */}
        {selectedMeet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg p-6 rounded shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Proctor Meet</h3>
                <button
                  onClick={() => setSelectedMeet(null)}
                  className="text-xl"
                >
                  &times;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Proctor Meet</label>
                  <input
                    disabled
                    className="w-full px-2 py-1 border rounded dark:bg-gray-500"
                    value={selectedMeet.name}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Proctor Meet Date
                  </label>
                  <input
                    disabled
                    className="w-full px-2 py-1 border rounded dark:bg-gray-500"
                    value={selectedMeet.date}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Proctor Meet Time
                  </label>
                  <input
                    disabled
                    className="w-full px-2 py-1 border rounded dark:bg-gray-500"
                    value={selectedMeet.time}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Proctor Review</label>
                <textarea
                  disabled
                  className="w-full p-2 border rounded dark:bg-gray-500"
                  value={selectedMeet.proctorReview}
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium">Student Review</label>
                <textarea
                  className="w-full p-2 border rounded dark:bg-gray-500"
                  value={studentResponse}
                  onChange={(e) => setStudentResponse(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMeet(null)}
                  className="bg-black text-white px-4 py-2 rounded "
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // TODO: Add API call or state update
                    alert("Submitted: " + studentResponse);
                    setSelectedMeet(null);
                  }}
                  className="bg-black text-white px-4 py-2 rounded "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
