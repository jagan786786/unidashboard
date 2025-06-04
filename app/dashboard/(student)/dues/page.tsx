"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Building2,
  Hash,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // 🔁 Replace with your real Stripe publishable key

export default function StudentDuesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rollNo = searchParams.get("rollNo") || "CS2023001";

  const [student, setStudent] = useState<any>(null);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      const rollNo = localStorage.getItem("userid");
      try {
        const res = await fetch(
          `http://localhost:8080/api/admin/student/${rollNo}`
        );
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudent();
  }, [rollNo]);

    const handlePayment = () => {
    if (!student) return;

    // Pass needed info via query params (encode if needed)
    const params = new URLSearchParams({
      rollNo: student.rollNo,
      amount: (student.totalFees * 100).toString(), // amount in paise
      name: student.name,
      email: student.email,
    });

    router.push(`/dashboard/payment-processing?${params.toString()}`);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    className = "",
  }: {
    icon: any;
    label: string;
    value: string;
    className?: string;
  }) => (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 ${className}`}
    >
      <Icon className="h-5 w-5 text-gray-600" />
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-base font-semibold text-gray-900 truncate">
          {value}
        </p>
      </div>
    </div>
  );

  if (!student)
    return (
      <p className="text-center mt-10 text-gray-500">Loading student data...</p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Student Portal
          </h1>
          <p className="text-gray-600">Fee Payment & Student Information</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-md bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {student.name}
                      </h2>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    Active Student
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <InfoItem
                    icon={Hash}
                    label="Roll Number"
                    value={student.rollNo}
                  />
                  <InfoItem
                    icon={FileText}
                    label="Registration No"
                    value={student.registrationNo}
                  />
                  <InfoItem
                    icon={Mail}
                    label="Email Address"
                    value={student.email}
                  />
                  <InfoItem
                    icon={Building2}
                    label="Department"
                    value={student.department}
                  />
                  <InfoItem
                    icon={Calendar}
                    label="Date of Joining"
                    value={formatDate(student.dateOfJoining)}
                    className="md:col-span-2"
                  />
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-600" />
                    About Student
                  </h3>
                  <p className="text-gray-700">{student.about}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-md bg-white h-fit">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  {isPaid ? (
                    <CheckCircle className="h-8 w-8 text-white" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isPaid ? "Payment Status" : "Outstanding Dues"}
                </h3>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {!isPaid ? (
                  <>
                    <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Total Amount Due
                      </p>
                      <p className="text-3xl font-bold text-red-600">
                        ₹{student.totalFees?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Sync Date : {student.paymentDate}
                      </p>
                    </div>
                    <Button
                      onClick={handlePayment}
                      className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <CreditCard className="h-5 w-5 mr-2" />
                      Pay Now
                    </Button>
                    <p className="text-xs text-gray-500">
                      Secure payment powered by Stripe
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <p className="text-lg font-bold text-green-800 mb-2">
                        Payment Successful!
                      </p>
                      <p className="text-sm text-green-600">
                        Your payment of ₹{student.totalFees?.toLocaleString()}{" "}
                        has been processed successfully.
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      All dues cleared
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            For any queries, contact the accounts department or visit the
            student help desk.
          </p>
        </div>
      </div>
    </div>
  );
}
