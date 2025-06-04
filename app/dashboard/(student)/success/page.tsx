"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Download, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast"; // ✅ Ensure this exists

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  const sessionId = searchParams.get("session_id");
  const rollNo = localStorage.getItem("userid") || searchParams.get("rollNo");
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");

  const { toast } = useToast(); // ✅ Toast hook

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const markAsPaid = async () => {
      if (!rollNo) return;

      try {
        const res = await fetch("http://localhost:8080/api/payment/mark-paid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNo }),
        });

        if (!res.ok) {
          throw new Error("Failed to update payment status");
        }

        // toast({
        //   title: "Payment Confirmed ✅",
        //   description: "Student payment has been marked as paid.",
        //   variant: "success",
        // });
      } catch (error) {
        console.error("Mark as paid failed", error);
        // toast({
        //   title: "Update Failed ❌",
        //   description: "Could not mark payment as completed. Try again later.",
        //   variant: "destructive",
        // });
      }
    };

    markAsPaid();
  }, [rollNo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <Card
        className={`relative max-w-md w-full bg-white/80 backdrop-blur-sm border-0 shadow-2xl transition-all duration-1000 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <CardContent className="p-8 text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6 border border-green-100">
            <div className="space-y-2 text-sm">
              {name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Student Name:</span>
                  <span className="font-semibold text-gray-800">{name}</span>
                </div>
              )}
              {rollNo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Roll Number:</span>
                  <span className="font-semibold text-gray-800">{rollNo}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-bold text-green-600">₹{amount}</span>
                </div>
              )}
              {sessionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono text-xs text-gray-800">
                    {sessionId.slice(-8)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                // ⏳ Add receipt download logic here
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>

            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="w-full border-2 border-green-200 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
