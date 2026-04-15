import { merriweather, roboto } from '@/app/ui/fonts';
import { getProductsInWishlist } from '@/app/lib/data/wishlist.data';
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import WishlistButton from '../ui/components/wishlist-button';
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
    

export default async function Page() {
    const session = await auth();

    if (!session?.user) {
        return (
            <main className="flex flex-grow flex-col p-0">
                <section className="flex flex-col items-center justify-center text-center py-10 bg-gradient-to-b from-hhblue-700 to-hhblue-400 text-white">
                    <h1 className={`${merriweather.className} text-5xl font-bold`}>Wishlist</h1>
                </section>
                <h1 className={`${merriweather.className} text-center font-bold py-10`}>There are no items to display... Please, sign in to access your wishlist.</h1>
            </main>
        );
    }
    
    const wishlistedItems = await getProductsInWishlist(session.user.id!);
    return (
        <main className="flex flex-grow flex-col p-0 bg-neutral">

            <h1 className="text-4xl font-bold px-8 py-6">Your Wishlist</h1>

            <section className="flex flex-col gap-6 px-8 pb-8">
                {wishlistedItems.length > 0 ? (
                    wishlistedItems.map((item) => (
                        <article
                            key={`${item.id}-${item.name}`}
                            className="flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center"
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={180}
                                height={180}
                                style={{ width: "180px", height: "auto" }}
                                className="rounded-lg object-cover aspect-square"
                            />

                            <div className="w-full">
                                <h2 className="mb-1 text-2xl font-bold" >{item.name}</h2>
                                <p className="mb-1 text-sm italic">{item.category}</p>

                                <div className="mb-1 font-bold text-[#FCB33D]">
                                    <div className="mb- flex items-center">
                                        {[...Array(5)].map((_, i) =>
                                            i < Math.round(item.rating_average) ? (
                                                <StarIcon key={i} className="h-5 w-5 text-[#FCB33D]" />
                                            ) : (
                                                <StarOutline key={i} className="h-5 w-5 text-gray-300" />
                                            )
                                        )}
                                    </div>
                                </div>

                                <p className="my-2 text-xl">
                                    ${item.price.toFixed(2)}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-3">
                                    <Link
                                        href={`/products/${item.id}`}
                                        className="rounded-md bg-hhorange-300 hover:bg-hhorange-400 px-5 py-3 font-bold text-black"
                                    >
                                        View Details
                                    </Link>

                                    <button
                                        type="button"
                                        className="rounded-md text-white bg-gray-400 px-3 py-3 hover:bg-hhblue-500 flex items-center justify-center"
                                        >
                                        <ShoppingCartIcon className="h-6 w-6" />
                                    </button>
                                    <WishlistButton productId={item.id} />

                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <h1 className={`${merriweather.className} text-center font-bold py-10`}>You don't have any items in your wishlist.</h1>
                )}
            </section>

        </main >
    );
}