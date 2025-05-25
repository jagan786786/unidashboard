"use client";

import { useState } from "react";

export default function FacultyProfileForm() {
  const [formData, setFormData] = useState({
    name: "Dr. Ramesh Kumar",
    department: "Computer Science and Engineering",
    employeeId: "CSE12345",
    designation: "Associate Professor",
    dob: "1980-04-15",
    gender: "Male",
    email: "ramesh.kumar@giet.edu",
    phone: "9876543210",
    joiningDate: "2010-07-01",
    qualification: "Ph.D. in Computer Science",
    address: {
      city: "Vizag",
      state: "Andhra Pradesh",
      country: "India",
      pincode: "530001",
    },
    profileImage: "/avatar.jpg",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field?: string
  ) => {
    const { name, value } = e.target;
    if (field === "address") {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Faculty Profile Submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Faculty Profile</h1>

      {/* Profile Image Section */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={formData.profileImage}
          alt="Faculty"
          className="w-28 h-28 rounded-full object-cover border border-gray-300 dark:border-gray-700 shadow"
        />
        <div>
          <h2 className="text-xl font-semibold">{formData.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {formData.designation}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Faculty Basic Info */}
        <fieldset className="border border-gray-300 dark:border-gray-700 p-4 rounded-md">
          <legend className="font-semibold text-lg">Basic Information</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1">Employee ID</label>
              <input
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Department</label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Designation</label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Date of Joining</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">Qualification</label>
              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </fieldset>

        {/* Address Section */}
        <fieldset className="border border-gray-300 dark:border-gray-700 p-4 rounded-md">
          <legend className="font-semibold text-lg">Address</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1">City</label>
              <input
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange(e, "address")}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <input
                name="state"
                value={formData.address.state}
                onChange={(e) => handleChange(e, "address")}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Country</label>
              <input
                name="country"
                value={formData.address.country}
                onChange={(e) => handleChange(e, "address")}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1">Pincode</label>
              <input
                name="pincode"
                value={formData.address.pincode}
                onChange={(e) => handleChange(e, "address")}
                className="input bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-black dark:bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-700 dark:hover:bg-gray-900 transition-colors"
        >
          Save Profile
        </button>
      </form>

      <style jsx>{`
        .input {
          padding: 0.5rem;
          width: 100%;
          border-radius: 6px;
          outline-offset: 2px;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .input:focus {
          border-color: #2563eb; /* Tailwind blue-600 */
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.4);
          background-color: var(--tw-bg-opacity, 1) white;
        }
        .dark .input:focus {
          background-color: #1e293b; /* Tailwind gray-800 */
        }
      `}</style>
    </div>
  );
}
