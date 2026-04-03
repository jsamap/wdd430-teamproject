import Link from 'next/link';

const categories = [
  'All',
  'Home Decor',
  'Kitchen',
  'Jewelry',
  'Art',
  'Furniture',
  'Gifts',
];

export default function CategoriesSection() {
  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category}
            href={
              category === 'All'
                ? '/products'
                : `/products?category=${encodeURIComponent(category)}`
            }
            className="category-card"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}