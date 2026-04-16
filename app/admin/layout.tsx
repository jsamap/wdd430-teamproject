import AdminSidebar from "../ui/components/layout/AdminSidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}