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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await sql`
      SELECT *
      FROM products
      WHERE id = ${id};
    `;

    if (product.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updated = await sql`
      UPDATE products
      SET
        name = ${name},
        category = ${category},
        description = ${description},
        price = ${numericPrice},
        stock = ${numericStock},
        image = ${image ?? null},
        details = ${details ?? null},
        rating_average = ${numericRatingAverage},
        rating_count = ${numericRatingCount}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (updated.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const deleted = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *;
    `;

    if (deleted.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully", product: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
