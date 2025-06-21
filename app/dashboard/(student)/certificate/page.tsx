"use client";

import React, { useEffect, useState } from "react";
import {
  Award,
  Upload,
  FileText,
  Calendar,
  User,
  GraduationCap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Certificate {
  id: string;
  name: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  uploadDate: string;
  description?: string;
}

export default function CertificatePage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [newCertificate, setNewCertificate] = useState({
    name: "",
    type: "",
    description: "",
    file: null as File | null,
  });

  const certificateTypes = [
    { value: "academic", label: "Academic Certificates", icon: GraduationCap },
    { value: "personal", label: "Personal Documents", icon: User },
    { value: "professional", label: "Professional Certificates", icon: Award },
    { value: "other", label: "Other Documents", icon: FileText },
  ];

  const fetchCertificates = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/certificates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure token is stored
        },
      });
      const data = await res.json();
      setCertificates(data);
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewCertificate((prev) => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newCertificate.name || !newCertificate.type || !newCertificate.file) {
      alert("Please fill all required fields");
      return;
    }

    const metadata = {
      name: newCertificate.name,
      type: newCertificate.type,
      description: newCertificate.description,
    };

    const formData = new FormData();
    formData.append("metadata", JSON.stringify(metadata));
    formData.append("file", newCertificate.file);

    try {
      const response = await fetch("http://localhost:8080/api/certificates", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload certificate");
      }

      const saved = await response.json();
      setCertificates((prev) => [...prev, saved]);

      // Reset form
      setNewCertificate({ name: "", type: "", description: "", file: null });
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    }
  };

  const getStatusIcon = (status: Certificate["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: Certificate["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Award className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Certificate Submission</h1>
          <p className="text-muted-foreground">
            Upload and manage your academic and personal certificates
          </p>
        </div>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please ensure all certificates are clear, legible, and in PDF or image
          format (JPG, PNG). Maximum file size is 10MB per document.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Submit New Certificate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Submit New Certificate
            </CardTitle>
            <CardDescription>
              Upload a new certificate or document for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="certificate-name">Certificate Name</Label>
                <Input
                  id="certificate-name"
                  placeholder="e.g., Bachelor's Degree"
                  value={newCertificate.name}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificate-type">Certificate Type</Label>
                <Select
                  value={newCertificate.type}
                  onValueChange={(value) =>
                    setNewCertificate((prev) => ({ ...prev, type: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select certificate type" />
                  </SelectTrigger>
                  <SelectContent>
                    {certificateTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Additional notes about this certificate..."
                  value={newCertificate.description}
                  onChange={(e) =>
                    setNewCertificate((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload File</Label>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {newCertificate.file
                        ? newCertificate.file.name
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Submit Certificate
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Certificate Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Required Documents
            </CardTitle>
            <CardDescription>
              Documents typically required for university admission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {certificateTypes.map((type) => (
              <div key={type.value} className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <type.icon className="h-4 w-4" />
                  {type.label}
                </div>
                <div className="text-sm text-muted-foreground ml-6">
                  {type.value === "academic" &&
                    "Transcripts, diplomas, degree certificates"}
                  {type.value === "personal" &&
                    "Birth certificate, passport, ID documents"}
                  {type.value === "professional" &&
                    "Work certificates, training certificates"}
                  {type.value === "other" &&
                    "Any additional supporting documents"}
                </div>
              </div>
            ))}
            <Separator />
            <div className="space-y-2">
              <h4 className="font-medium">Submission Guidelines</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• All documents must be official copies</li>
                <li>• Non-English documents need certified translations</li>
                <li>• Ensure all text is clearly readable</li>
                <li>• Submit documents in chronological order</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submitted Certificates */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Submitted Certificates
          </CardTitle>
          <CardDescription>
            Track the status of your submitted documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No certificates submitted yet</p>
              <p className="text-sm">
                Upload your first certificate to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {getStatusIcon(cert.status)}
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Submitted on{" "}
                        {new Date(cert.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(cert.status)}
                    >
                      {cert.status.charAt(0).toUpperCase() +
                        cert.status.slice(1)}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
