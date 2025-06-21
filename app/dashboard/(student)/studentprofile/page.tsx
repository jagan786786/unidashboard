"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, Edit } from "lucide-react";

export default function StudentDetailsPage() {
  const rollNo = "21CSE389";
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [studentData, setStudentData] = useState({
    rollNo: "",
    name: "",
    department: "",
    program: "",
    branch: "",
    semester: "",
    phone: "",
    nativePlace: "",
    about: "",
    email: "",
    dateOfJoining: "",
    totalFees: 0.0,
    registrationNo: "",
    sectionName: "",
    paymentDate: "",
    profileImageUrl: "",
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      const rollNo = localStorage.getItem("userid");
      try {
        const res = await fetch(
          `http://localhost:8080/api/admin/student/${rollNo}`
        );
        if (!res.ok) throw new Error("Failed to fetch student data");
        const data = await res.json();
        setStudentData(data);

         // 👇 Add full image path for rendering
        if (data.profileImageUrl) {
          setProfileImage(studentData.profileImageUrl);
        }
      } catch (err: any) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [rollNo]);

  const handleInputChange = (field: string, value: string | number) => {
    setStudentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file); // Save for sending
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      // Append the student data as JSON blob
      formData.append(
        "student",
        new Blob([JSON.stringify(studentData)], {
          type: "application/json",
        })
      );

      // Append profile image if uploaded (assumes File is stored in state)
      if (uploadedFile) {
        formData.append("profileImage", uploadedFile);
      }

      const res = await fetch(
        `http://localhost:8080/api/admin/student/${studentData.rollNo}/profile`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.text();
      console.log("Success:", result);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving student data:", err);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  if (loading)
    return <div className="text-center mt-10">Loading student profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Manage student information and details
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={studentData.profileImageUrl} alt={studentData.name} />
                  <AvatarFallback className="text-lg">
                    {getInitials(studentData.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {studentData.name}
                </h2>
                <p className="text-gray-600">
                  {studentData.program} - {studentData.branch}
                </p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>Roll No: {studentData.rollNo}</span>
                  <span>•</span>
                  <span>Semester: {studentData.semester}</span>
                  <span>•</span>
                  <span>Section: {studentData.sectionName}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Academic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Student academic details and enrollment information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Roll Number</Label>
                  <Input
                    value={studentData.rollNo}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleInputChange("rollNo", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Registration Number</Label>
                  <Input
                    value={studentData.registrationNo}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleInputChange("registrationNo", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Program</Label>
                <Input
                  value={studentData.program}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange("program", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <Input
                    value={studentData.department}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleInputChange("department", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Branch</Label>
                  <Input
                    value={studentData.branch}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleInputChange("branch", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Semester</Label>
                  <Select
                    value={studentData.semester}
                    onValueChange={(value) =>
                      handleInputChange("semester", value)
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "1st",
                        "2nd",
                        "3rd",
                        "4th",
                        "5th",
                        "6th",
                        "7th",
                        "8th",
                      ].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s} Semester
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Section</Label>
                  <Input
                    value={studentData.sectionName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      handleInputChange("sectionName", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Date of Joining</Label>
                <Input
                  type="date"
                  value={studentData.dateOfJoining}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInputChange("dateOfJoining", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Student personal and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Phone Number</Label>
                <Input
                  value={studentData.phone}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={studentData.email}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Native Place</Label>
                <Input
                  value={studentData.nativePlace}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInputChange("nativePlace", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>About</Label>
                <Textarea
                  value={studentData.about}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Info */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Tuition and payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Total Fees</Label>
                <Input
                  type="number"
                  value={studentData.totalFees}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInputChange("totalFees", parseFloat(e.target.value))
                  }
                />
              </div>
              <div>
                <Label>Last Payment Date</Label>
                <Input
                  type="date"
                  value={studentData.paymentDate}
                  disabled={!isEditing}
                  onChange={(e) =>
                    handleInputChange("paymentDate", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Summary of student status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-800">
              <div>
                <strong>Program:</strong> {studentData.program}
              </div>
              <div>
                <strong>Branch:</strong> {studentData.branch}
              </div>
              <div>
                <strong>Semester:</strong> {studentData.semester}
              </div>
              <div>
                <strong>Section:</strong> {studentData.sectionName}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
