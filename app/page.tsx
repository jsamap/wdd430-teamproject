import HhLogo from '@/app/ui/hh-logo';
import { merriweather, roboto } from '@/app/ui/fonts';


export default function Page() {
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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow p-6 text-center max-w-[250px] mx-auto 
                   transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={`https://placehold.co/200x200`}
                alt={`Product ${item}`}
                className="w-full aspect-square object-cover rounded transition duration-300 hover:opacity-90"
              />
              <h3 className="mt-4 font-semibold">Product {item}</h3>
              <p>Seller Name</p>
              <p className="text-gray-600">$19.99</p>
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
