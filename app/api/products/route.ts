import { NextResponse } from "next/server";
import sql from "@/app/lib/db/postgres";

type ProductBody = {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  details?: string | null;
  rating_average?: number;
  rating_count?: number;
};

export async function GET() {
  try {
    const products = await sql`
      SELECT *
      FROM products
      ORDER BY name ASC;
    `;

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductBody;

    const {
      name,
      category,
      description,
      price,
      stock,
      image,
      details,
      rating_average,
      rating_count,
    } = body;

    if (
      !name ||
      !category ||
      !description ||
      price === undefined ||
      price === null ||
      stock === undefined ||
      stock === null
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: name, category, description, price, stock",
        },
        { status: 400 }
      );
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericRatingAverage = Number(rating_average ?? 0);
    const numericRatingCount = Number(rating_count ?? 0);

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json(
        { message: "Price must be a valid non-negative number" },
        { status: 400 }
      );
    }

    if (Number.isNaN(numericStock) || numericStock < 0) {
      return NextResponse.json(
        { message: "Stock must be a valid non-negative number" },
        { status: 400 }
      );
    }

    if (Number.isNaN(numericRatingAverage) || numericRatingAverage < 0) {
      return NextResponse.json(
        { message: "rating_average must be a valid non-negative number" },
        { status: 400 }
      );
    }

    if (Number.isNaN(numericRatingCount) || numericRatingCount < 0) {
      return NextResponse.json(
        { message: "rating_count must be a valid non-negative number" },
        { status: 400 }
      );
    }

    const created = await sql`
      INSERT INTO products (
        name,
        category,
        description,
        price,
        stock,
        image,
        details,
        rating_average,
        rating_count
      )
      VALUES (
        ${name},
        ${category},
        ${description},
        ${numericPrice},
        ${numericStock},
        ${image ?? null},
        ${details ?? null},
        ${numericRatingAverage},
        ${numericRatingCount}
      )
      RETURNING *;
    `;

    
    return NextResponse.json(created[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}