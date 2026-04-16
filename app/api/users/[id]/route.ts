import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "@/app/lib/db/postgres";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type UpdateUserBody = {
  name: string;
  email: string;
  role?: string;
  password?: string;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const user = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (user.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(user[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as UpdateUserBody;
    const { name, email, role, password } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Missing required fields: name, email" },
        { status: 400 },
      );
    }

    const emailOwner = await sql`
      SELECT id
      FROM users
      WHERE email = ${email}
        AND id <> ${id}
      LIMIT 1;
    `;

    if (emailOwner.length > 0) {
      return NextResponse.json(
        { message: "Another user already uses this email" },
        { status: 409 },
      );
    }

    let updated;

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      updated = await sql`
        UPDATE users
        SET
          name = ${name},
          email = ${email},
          role = ${role ?? "buyer"},
          password = ${hashedPassword}
        WHERE id = ${id}
        RETURNING id, name, email, role;
      `;
    } else {
      updated = await sql`
        UPDATE users
        SET
          name = ${name},
          email = ${email},
          role = ${role ?? "buyer"}
        WHERE id = ${id}
        RETURNING id, name, email, role;
      `;
    }

    if (updated.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const deleted = await sql`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id;
    `;

    if (deleted.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 },
    );
  }
}