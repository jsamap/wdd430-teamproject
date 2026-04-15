import { NextResponse } from "next/server";
import sql from "@/app/lib/db/postgres";

type ProductBody = {
  name: string;
  description: string;
  price: number;
  image?: string | null;
  details?: string | null;
};

export async function GET() {
  try {
    const products = await sql`
      SELECT *
      FROM products
      ORDER BY name ASC
    `;

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductBody;
    const { name, description, price, image, details } = body;

    if (!name || !description || price === undefined || price === null) {
      return NextResponse.json(
        { message: "Missing required fields: name, description, price" },
        { status: 400 },
      );
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { message: "Price must be a valid positive number" },
        { status: 400 },
      );
    }

    const created = await sql`
      INSERT INTO products (
        name,
        description,
        price,
        image,
        details
      )
      VALUES (
        ${name},
        ${description},
        ${numericPrice},
        ${image ?? null},
        ${details ?? null}
      )
      RETURNING *;
    `;

    return NextResponse.json(created[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}