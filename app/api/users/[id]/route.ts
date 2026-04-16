import { NextResponse } from "next/server";
import sql from "@/app/lib/db/postgres";

type UserBody = {
  name: string;
  email: string;
  role: string;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE id = ${id};
    `;

    if (user.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to fetch user" },
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
    const body = (await request.json()) as UserBody;
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, role" },
        { status: 400 }
      );
    }

    const updated = await sql`
      UPDATE users
      SET
        name = ${name},
        email = ${email},
        role = ${role}
      WHERE id = ${id}
      RETURNING id, name, email, role;
    `;

    if (updated.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to update user" },
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
      DELETE FROM users
      WHERE id = ${id}
      RETURNING id, name, email, role;
    `;

    if (deleted.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully", user: deleted[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);

    return NextResponse.json(
      { message: "Failed to delete user" },
      { status: 500 }
    );
  }
}