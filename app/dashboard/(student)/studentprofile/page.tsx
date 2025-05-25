"use client";

import { useState } from "react";

export default function StudentProfileForm() {
  const [formData, setFormData] = useState({
    name: "DAMALU KARTIK",
    program: "Master of Business Administration",
    branch: "Master In Business Administration",
    rollNumber: "24MBA045",
    registrationNumber: "24PG020045",
    semester: "3",
    section: "B",
    dob: "2003-05-29",
    fatherName: "DAMALU NARASIMHA MURTY",
    motherName: "DAMALU SARADA",
    gender: "Male",
    religion: "HINDU",
    email: "kartikkdm7@gmail.com",
    officialEmail: "24mba045.damalukartik@giet.edu",
    phone: "7327921677",
    address: {
      country: "India",
      state: "Odisha",
      city: "Gunupur",
      pincode: "765022",
      street: "Kumbhar Street",
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
    console.log("Submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Student Profile</h1>

      {/* Profile Image Section */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={formData.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border shadow"
        />
        <div>
          <h2 className="text-xl font-semibold">{formData.name}</h2>
          <p className="text-gray-600">{formData.program}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Student Summary */}
        <fieldset className="border p-4 rounded-md">
          <legend className="font-semibold text-lg">Student Summary</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1">Roll Number</label>
              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Registration Number</label>
              <input
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Program</label>
              <input
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Branch</label>
              <input
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Semester</label>
              <input
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Section</label>
              <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </fieldset>

        {/* Personal Info */}
        <fieldset className="border p-4 rounded-md">
          <legend className="font-semibold text-lg">Personal Info</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1">Father's Name</label>
              <input
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Mother's Name</label>
              <input
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Religion</label>
              <input
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Personal Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Official Email</label>
              <input
                name="officialEmail"
                value={formData.officialEmail}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        </fieldset>

        {/* Address Info */}
        <fieldset className="border p-4 rounded-md">
          <legend className="font-semibold text-lg">Address</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block mb-1">Country</label>
              <input
                name="country"
                value={formData.address.country}
                onChange={(e) => handleChange(e, "address")}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <input
                name="state"
                value={formData.address.state}
                onChange={(e) => handleChange(e, "address")}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange(e, "address")}
                className="input"
              />
            </div>
            <div>
              <label className="block mb-1">Pincode</label>
              <input
                name="pincode"
                value={formData.address.pincode}
                onChange={(e) => handleChange(e, "address")}
                className="input"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1">Street</label>
              <input
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange(e, "address")}
                className="input"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Profile
        </button>
      </form>

      <style jsx>{`
        .input {
          padding: 0.5rem;
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
