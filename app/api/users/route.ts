import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "@/app/lib/db/postgres";

type UserBody = {
  name: string;
  email: string;
  password: string;
  role?: string;
};

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
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UserBody;
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, password" },
        { status: 400 },
      );
    }

    const existingUser = await sql`
      SELECT id
      FROM users
      WHERE email = ${email}
      LIMIT 1;
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const created = await sql`
      INSERT INTO users (name, email, password, role)
      VALUES (
        ${name},
        ${email},
        ${hashedPassword},
        ${role ?? "buyer"}
      )
      RETURNING id, name, email, role;
    `;

    return NextResponse.json(created[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }
}