import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SellerProfileForm from "@/app/ui/seller/SellerProfileForm";
import { getSellerProfileFields } from "@/app/lib/data/user.data";

export default async function SellerProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  const userId = session.user.id;
  const initial = await getSellerProfileFields(userId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My seller profile</h1>
      <SellerProfileForm initial={initial} sellerId={userId} />
    </div>
  );
}
