import { NextResponse } from "next/server";
import { addProductToWishlist } from "@/app/lib/data/wishlist.data";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    console.log(`Adding product with ID '${productId}' to wishlist for user '${session.user.id}'`);
    await addProductToWishlist(session.user.id!, productId);

    return NextResponse.json({ success: true });
}