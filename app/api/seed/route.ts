import bcrypt from "bcrypt";
import sql from "@/app/lib/db/postgres";
import { users as dataUsers, products as dataProducts } from "@/app/lib/placeholder-data";

async function seedUsers(limit_users: number) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(50) DEFAULT 'buyer'
    );
  `;

  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'buyer';`;

  const insertedUsers = await Promise.all(
    dataUsers.slice(0, limit_users).map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // check if the user already exists
      const existingUser =
        await sql`SELECT 1 FROM users WHERE email = ${user.email}`;
      if (existingUser.length > 0) {
        return;
      }

      return sql`
        INSERT INTO users (name, email, password, role)
        VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedProducts(limit_products: number) {
  const userSeller = await sql`SELECT id FROM users WHERE role = 'seller' LIMIT 1`;
  const sellerId = userSeller.length > 0 ? userSeller[0].id : null;

  if (!sellerId) {
    console.warn("No seller users found. Skipping seeding products.");
    return;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price FLOAT NOT NULL DEFAULT 0,
      stock INT DEFAULT 0,
      image VARCHAR(255) NULL,
      rating_average FLOAT DEFAULT 0,
      rating_count INT DEFAULT 0,
      details TEXT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    dataProducts.slice(0, limit_products).map(async (product) => {
      return sql`
        INSERT INTO products (user_id, name, category, description, price, stock, image, rating_average, rating_count, details)
        VALUES (
          ${sellerId}, 
          ${product.name ?? null}, 
          ${product.category ?? null}, 
          ${product.description ?? null}, 
          ${product.price ?? 0}, 
          ${product.stock ?? 0}, 
          ${product.image ?? null}, 
          ${product.rating ?? 0}, 
          ${product.rating_count ?? 0}, 
          ${product.details ?? null}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedProducts;
}

async function seedReviews() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      review TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Fetch a user to assign the mock reviews to
  const users = await sql`SELECT id FROM users LIMIT 1`;
  const userId = users.length > 0 ? users[0].id : null;

  if (!userId) {
    console.warn("No users found. Skipping seeding reviews.");
    return;
  }

  const productList = await sql`SELECT id FROM products`;

  const mockReviews = [
    { product_id: productList[0].id, rating: 3, review: "Absolutely love the craftsmanship! Perfect addition to my living room." },
    { product_id: productList[1].id, rating: 4, review: "Great quality, but took a bit long to ship." },
    { product_id: productList[2].id, rating: 5, review: "Minimalist and beautiful. Highly recommend the seller." }
  ];

  const insertedReviews = await Promise.all(
    mockReviews.map(async (rev) => {
      return sql`
        INSERT INTO reviews (product_id, user_id, rating, review)
        VALUES (${rev.product_id}, ${userId}, ${rev.rating}, ${rev.review})
      `;
    }),
  );

  return insertedReviews;
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    key,
    limit_users,
    limit_products,
  } = body;

  if (key !== process.env.SECRET_KEY) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await sql.begin( async (sql) => [
      await seedUsers(limit_users ?? dataUsers.length),
      await seedProducts(limit_products ?? dataProducts.length),
      await seedReviews(),
      // add here the other tables
    ]);

    await Promise.all(result);    

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { key } = body;

  if (key !== process.env.SECRET_KEY) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // delete data from tables
    await sql`DELETE FROM reviews`;
    await sql`DELETE FROM users`;
    await sql`DELETE FROM products`;
    // add here the other tables

    // delete tables to create new ones with the new schema
      await sql`DROP TABLE IF EXISTS reviews CASCADE`;
      await sql`DROP TABLE IF EXISTS users CASCADE`;
      await sql`DROP TABLE IF EXISTS products CASCADE`;
    // add here the other tables
    return Response.json({ message: "Database cleared successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
