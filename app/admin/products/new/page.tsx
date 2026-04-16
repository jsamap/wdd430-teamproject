import { getSellerUsersForAdmin } from "@/app/lib/data/user.data";
import AdminNewProductClient from "./AdminNewProductClient";

export default async function NewProductPage() {
  const sellers = await getSellerUsersForAdmin();

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Add new product</h2>
      <AdminNewProductClient sellers={sellers as any[]} />
    </section>
  );
}
