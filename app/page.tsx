import HhLogo from '@/app/ui/hh-logo';
import { merriweather, roboto } from '@/app/ui/fonts';
import { getFeaturedProducts } from '@/app/lib/data/product.data';

export default async function Page() {
  const products = await getFeaturedProducts();

  return (
    <main className="flex flex-grow flex-col p-0">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-hhblue-700 to-hhblue-400 text-white">
        <h1 className={`${merriweather.className} text-5xl font-bold`}>Welcome</h1>
        <p className="mt-4 text-lg">Discover Treasures, Support Artisans.</p>
        <a href="/products" className="mt-6 px-6 py-3 bg-white text-hhblue-500 font-semibold rounded-lg shadow hover:bg-hhorange-300 hover:text-black">
          Shop Now
        </a>
      </section>

     {/* Featured Products */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>

        {/* Responsive grid with tighter spacing */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 justify-center">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow p-6 text-center max-w-[250px] mx-auto 
                   transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={product.image || `https://placehold.co/200x200`}
                alt={product.name}
                className="w-full aspect-square object-cover rounded transition duration-300 hover:opacity-90"
              />
              <h3 className="mt-4 font-semibold">{product.name}</h3>
              <p>{product.seller_name}</p>
              <p className="text-gray-600">${product.price}</p>
              <button className="mt-4 px-4 py-2 bg-hhblue-400 text-white rounded 
                           hover:bg-hhorange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>



    </main >
  );
}
