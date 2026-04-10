import Link from "next/link";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Example Item x 1</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Another Item x 2</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
            <span>Total</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <span>🔒 Secure Checkout</span>
          <span>VISA • Mastercard • PayPal</span>
        </div>
        <button className="mt-4 px-4 py-2 bg-hhblue-400 text-white rounded hover:bg-hhorange-600 transition duration-300">
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}
