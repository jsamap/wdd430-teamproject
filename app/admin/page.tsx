import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage products, user accounts, and your profile.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/admin/products"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="mt-2 text-sm text-gray-600">
            Add, edit, and delete products in the store.
          </p>
        </Link>

        <Link
          href="/admin/users"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="mt-2 text-sm text-gray-600">
            View and manage all registered user accounts.
          </p>
        </Link>

        <Link
          href="/admin/profile"
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            View and update your admin profile information.
          </p>
        </Link>
      </div>
    </section>
  );
}