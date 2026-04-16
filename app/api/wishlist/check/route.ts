import { NextResponse } from "next/server";
import { checkIfProductIsWishlisted } from "@/app/lib/data/wishlist.data";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    const isWishlisted = await checkIfProductIsWishlisted(session.user.id!, productId);

    return NextResponse.json({ isWishlisted });
}