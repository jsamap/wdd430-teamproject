import { auth } from "@/auth";
import { getProductsInWishlist } from "@/app/lib/data/wishlist.data";
import WishlistItems from "@/app/ui/components/WishlistItems";
import { merriweather } from "@/app/ui/fonts";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="flex flex-grow flex-col p-0">
        <section className="flex flex-col items-center justify-center text-center py-10 bg-gradient-to-b from-hhblue-700 to-hhblue-400 text-white">
          <h1 className={`${merriweather.className} text-5xl font-bold`}>Wishlist</h1>
        </section>
        <h1 className={`${merriweather.className} text-center font-bold py-10`}>
          There are no items to display... Please, sign in to access your wishlist.
        </h1>
      </main>
    );
  }

  const items = await getProductsInWishlist(session.user.id!);

  return (
    <main className="flex flex-grow flex-col p-0 bg-neutral">
      <h1 className="text-4xl font-bold px-8 py-6">Your Wishlist ❤️🛍️</h1>
      <WishlistItems initialItems={items} />
    </main>
  );
}
