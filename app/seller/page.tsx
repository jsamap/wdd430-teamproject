import { auth } from "@/auth";
import Link from "next/link";

export default async function SellerDashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
      <p className="max-w-xl text-gray-600">
        Use the links on the left to edit your public seller story and to add products. Anything you add
        appears on the main <Link href="/products">Products</Link> page for all shoppers.
      </p>
      <ul className="list-inside list-disc space-y-2 text-gray-800">
        <li>
          <Link className="text-[#6496FA] hover:underline" href="/seller/profile">
            My profile
          </Link>{" "}
          — tagline, bio, and story
        </li>
        <li>
          <Link className="text-[#6496FA] hover:underline" href="/seller/products">
            My products
          </Link>{" "}
          — list, edit, or delete your items
        </li>
      </ul>
    </div>
  );
}
