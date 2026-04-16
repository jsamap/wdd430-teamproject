import { NextResponse } from "next/server";
import sql from "@/app/lib/db/postgres";

export async function GET() {
  try {
    const users = await sql`
      SELECT id, name, email, role
      FROM users
      ORDER BY name ASC;
    `;

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("GET /api/users error:", error);

    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}