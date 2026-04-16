import { NextResponse } from "next/server";
import sql from "@/app/lib/db/postgres";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await sql`
      SELECT id, name, email, role
      FROM users
      WHERE email = ${session.user.email};
    `;

    if (user.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/users/me error:", error);

    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    const updated = await sql`
      UPDATE users
      SET
        name = ${name},
        email = ${email}
      WHERE email = ${session.user.email}
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
    console.error("PUT /api/users/me error:", error);

    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}