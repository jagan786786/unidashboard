"use client";

import { useState } from "react";

const placementData = {
  2024: {
    eligible: 480,
    total: 530,
    placed: 437,
    highestPackage: 18,
    averagePackage: 6.2,
    topRecruiters: ["Amazon", "Wipro", "Deloitte", "Tata Steel"],
    departmentStats: [
      { name: "CSE", percentage: 97, avgPackage: 7.5, recruiter: "Amazon" },
      { name: "ECE", percentage: 92, avgPackage: 6.8, recruiter: "TCS" },
      { name: "Mechanical", percentage: 84, avgPackage: 5.1, recruiter: "Tata Steel" },
      { name: "Civil Engineering", percentage: 76, avgPackage: 4.7, recruiter: "L&T" },
      { name: "MBA", percentage: 89, avgPackage: 6.5, recruiter: "Deloitte" },
    ],
    additional: {
      multipleOffers: 62,
      higherStudies: 41,
      fullTimeConversions: 75,
    },
  },
  2023: {
    eligible: 460,
    total: 520,
    placed: 420,
    highestPackage: 16,
    averagePackage: 5.9,
    topRecruiters: ["Infosys", "Accenture", "Capgemini"],
    departmentStats: [
      { name: "CSE", percentage: 95, avgPackage: 6.8, recruiter: "Infosys" },
      { name: "ECE", percentage: 88, avgPackage: 5.7, recruiter: "TCS" },
    ],
    additional: {
      multipleOffers: 50,
      higherStudies: 36,
      fullTimeConversions: 60,
    },
  },
  // Add more years...
};

export default function PlacementDetails() {
  const [selectedYear, setSelectedYear] = useState<keyof typeof placementData>(2024);

  const data = placementData[selectedYear];

  return (
    <div className="p-6">
      <div className="mb-4 flex gap-4 items-center">
        <label htmlFor="yearSelect" className="font-medium">Select Year:</label>
        <select
          id="yearSelect"
          className="border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value as unknown as keyof typeof placementData)}
        >
          {Object.keys(placementData).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Placement Summary - {selectedYear}</h2>
        <p><strong>Placement Rate:</strong> {((data.placed / data.eligible) * 100).toFixed(1)}%</p>
        <p><strong>Eligible Students:</strong> {data.eligible} / {data.total}</p>
        <p><strong>Placed Students:</strong> {data.placed}</p>
        <p><strong>Highest Package:</strong> ₹{data.highestPackage} LPA</p>
        <p><strong>Average Package:</strong> ₹{data.averagePackage} LPA</p>
      </div>

      <div className="mt-6 bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Department-wise Breakdown</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Placement %</th>
              <th className="p-2 border">Avg. Package</th>
              <th className="p-2 border">Top Recruiter</th>
            </tr>
          </thead>
          <tbody>
            {data.departmentStats.map((dept) => (
              <tr key={dept.name}>
                <td className="p-2 border">{dept.name}</td>
                <td className="p-2 border">{dept.percentage}%</td>
                <td className="p-2 border">₹{dept.avgPackage} LPA</td>
                <td className="p-2 border">{dept.recruiter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Additional Insights</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Multiple Offers:</strong> {data.additional.multipleOffers}</li>
          <li><strong>Higher Studies:</strong> {data.additional.higherStudies}</li>
          <li><strong>Internship to Full-time Conversions:</strong> {data.additional.fullTimeConversions}</li>
        </ul>
      </div>
    </div>
  );
}
