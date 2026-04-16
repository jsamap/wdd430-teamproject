"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/users", {
          cache: "no-store",
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch users");
        }

        const data = await res.json();

        setUsers(
          data.map((u: any) => ({
            id: u.id,
            name: u.name ?? "",
            email: u.email ?? "",
            role: u.role ?? "",
          }))
        );
      } catch (error: any) {
        console.error("Failed to load users:", error);
        setError(error.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete user");
    }
  }

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <section className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">All User Accounts</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/users/edit/${user.id}`}
                        className="rounded-md border px-3 py-1"
                      >
                        Edit
                      </Link>
                      {user.role !== "admin" && (
                        <button
                        type="button"
                        onClick={() => handleDelete(user.id)}
                        className="rounded-md bg-red-600 px-3 py-1 text-white"
                      >
                        Delete
                      </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}