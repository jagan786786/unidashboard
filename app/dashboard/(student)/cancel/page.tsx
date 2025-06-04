"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { XCircle, RefreshCw, ArrowLeft, HelpCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentCancelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)

  const rollNo = searchParams.get("rollNo")
  const amount = searchParams.get("amount")
  const name = searchParams.get("name")
  const email = searchParams.get("email")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleRetryPayment = () => {
    const params = new URLSearchParams()
    if (rollNo) params.set("rollNo", rollNo)
    if (amount) params.set("amount", amount)
    if (name) params.set("name", name)
    if (email) params.set("email", email)

    router.push(`/payment/process?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <Card
        className={`relative max-w-md w-full bg-white/80 backdrop-blur-sm border-0 shadow-2xl transition-all duration-1000 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <CardContent className="p-8 text-center">
          {/* Cancel Icon with Animation */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <XCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was cancelled or interrupted. Don't worry, no charges were made to your account.
          </p>

          {/* Payment Details */}
          {(name || rollNo || amount) && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 mb-6 border border-orange-100">
              <h3 className="font-semibold text-gray-700 mb-2">Payment Details:</h3>
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
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-orange-600">₹{amount}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={() => router.push("/student-dues")}
              variant="outline"
              className="w-full border-2 border-orange-200 text-orange-700 hover:bg-orange-50 font-semibold py-3 rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-center mb-2">
              <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-semibold text-blue-800">Need Help?</h3>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              If you're experiencing issues with payment, contact our support team:
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                onClick={() => {
                  /* Add phone call logic */
                }}
              >
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                onClick={() => {
                  /* Add email logic */
                }}
              >
                <Mail className="w-4 h-4 mr-1" />
                Email
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 mt-4">
            Your payment session has expired. Please try again or contact support if the issue persists.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
