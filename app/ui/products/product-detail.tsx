import Link from "next/link";

export default async function ProductDetail({
    product,
}: {
    product: any;
}) {
    return (
        <main className="min-h-screen bg-[#F7F7F7] px-8 py-8 text-black">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/products"
          className="mb-6 inline-block font-medium text-[#6496FA] hover:underline"
        >
          ← Back to Products
        </Link>

        <section className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:w-1/2">
            <h1 className="font-serif text-4xl font-bold">{product.name}</h1>

            <div className="font-bold text-[#FCB33D]">
              ★★★★★ <span className="ml-1 font-normal text-black">{product.rating_average}/5 ({product.rating_count} reviews)</span>
            </div>

            <p className="text-xl font-bold text-[#FCB33D]">
              ${product.price.toFixed(2)}
            </p>

            <p>{product.description}</p>
            <p>{product.details}</p>

            <button
              type="button"
              className="mt-2 w-fit rounded-md bg-[#FCB33D] px-5 py-3 font-bold text-black transition hover:-translate-y-0.5"
            >
              Add to Cart
            </button>
          </div>
        </section>
      </div>
    </main>
    );

}