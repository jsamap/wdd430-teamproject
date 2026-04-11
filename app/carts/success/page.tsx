import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-700">
          🎉 Order Successful!
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your purchase. Your order has been placed and is being
          processed.
        </p>
        <Link
          href={`/`}
          className="mt-6 inline-block bg-hhblue-600 text-white px-6 py-2 rounded-md hover:bg-hhorange-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
