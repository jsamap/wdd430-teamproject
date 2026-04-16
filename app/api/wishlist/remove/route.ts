import { NextResponse } from "next/server";
import { removeProductFromWishlist } from "@/app/lib/data/wishlist.data";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    console.log(`Removing product with ID '${productId}' from wishlist for user '${session.user.id}'`);
    await removeProductFromWishlist(session.user.id!, productId);

    return NextResponse.json({ success: true });
}