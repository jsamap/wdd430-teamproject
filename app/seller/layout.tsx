import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SellerSidebar from "@/app/ui/seller/SellerSidebar";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user?.id || role !== "seller") {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SellerSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
