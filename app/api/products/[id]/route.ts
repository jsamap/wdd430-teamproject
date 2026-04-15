import { NextResponse } from "next/server";
import sql from "@/app/lib/db/postgres";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ProductBody = {
  name: string;
  description: string;
  price: number;
  image?: string | null;
  details?: string | null;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const product = await sql`
      SELECT *
      FROM products
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (product.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
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

    const updated = await sql`
      UPDATE products
      SET
        name = ${name},
        description = ${description},
        price = ${numericPrice},
        image = ${image ?? null},
        details = ${details ?? null}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (updated.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const deleted = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING id;
    `;

    if (deleted.length === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 },
    );
  }
}