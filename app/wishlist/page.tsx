import { merriweather, roboto } from "@/app/ui/fonts";

export default async function Page() {
  return (
    <main className="flex flex-grow flex-col p-0">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-10 bg-gradient-to-b from-hhblue-700 to-hhblue-400 text-white">
        <h1 className={`${merriweather.className} text-5xl font-bold`}>
          Wishlist
        </h1>
      </section>

      <p className="flex font-bold justify-center p-4 text-lg">
        Page under construction...
      </p>
    </main>
  );
}
