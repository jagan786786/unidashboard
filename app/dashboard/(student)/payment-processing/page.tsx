"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Q5DI5HYbsyzfouYGDJ7ontlMzdD1mlLKUBkrfc8fsv7q3PoRWWLSLDb7gDbuKx6IFdiZMUOrWFgQqyvf9mu6l9Y00FKgQXnN1"); // replace with your key

export default function PaymentProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // You could pass rollNo, amount etc via query params or get from localStorage
  const rollNo = searchParams.get("rollNo");
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processPayment = async () => {
      if (!rollNo || !amount || !name || !email) {
        setError("Missing payment details");
        return;
      }

      const stripe = await stripePromise;
      try {
        const res = await fetch("http://localhost:8080/api/payment/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNo, amount: Number(amount), name, email }),
        });

        if (!res.ok) {
          throw new Error("Failed to create checkout session");
        }

        const { id } = await res.json();

        const result = await stripe?.redirectToCheckout({ sessionId: id });

        if (result?.error) {
          setError(result.error.message || "Failed to redirect to checkout");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };

    processPayment();
  }, [rollNo, amount, name, email]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Payment Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push("/student-dues")} // Or wherever
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-6"></div>
          <h2 className="text-2xl font-semibold mb-2">Creating your payment session...</h2>
          <p className="text-gray-600">Please wait while we prepare your checkout page.</p>

          <style>{`
            .loader {
              border-top-color: #4B5563; /* gray-700 */
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
