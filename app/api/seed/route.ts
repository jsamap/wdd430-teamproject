import bcrypt from "bcrypt";
import sql from "@/app/lib/db/postgres";
import { users, products } from "@/app/lib/placeholder-data";

async function seedUsers() {
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
    users.map(async (user) => {
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

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price INT NOT NULL,
      image VARCHAR(255) NULL,
      rating_average FLOAT DEFAULT 0,
      rating_count INT DEFAULT 0,
      details TEXT NULL
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      return sql`
        INSERT INTO products (name, description, price, image, rating_average, rating_count, details)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image}, ${product.rating_average}, ${product.rating_count}, ${product.details})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedProducts;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { key } = body;

  if (key !== process.env.SECRET_KEY) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedProducts(),
      // add here the other tables
    ]);

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
    await sql`DELETE FROM users`;
    await sql`DELETE FROM products`;
    // add here the other tables
    return Response.json({ message: "Database cleared successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
