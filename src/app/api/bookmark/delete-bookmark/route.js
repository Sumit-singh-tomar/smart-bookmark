import { verifyJwt } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import BookMark from "@/models/BookMark";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    await connectDB();

    try {
        const { valid, message } = await verifyJwt(req);

        if (!valid) {
            return NextResponse.json({ status: false, message: message }, { status: 401 });
        }

        const id = req.nextUrl.searchParams.get("id") || 1;

        const bookMark = await BookMark.findById(id);

        if (!bookMark) {
            return NextResponse.json({ status: false, message: "bookmark not found" }, { status: 404 });
        }

        await BookMark.findByIdAndDelete(id);

        global.bookmarkStreams?.[req.user._id]?.forEach(controller => {
            controller.enqueue(
                `event: bookmark_deleted\ndata: ${id}\n\n`
            );
        });

        return NextResponse.json({
            status: true,
            message: "bookmark deleted successfully"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            status: false,
            message: "Server Error",
            details: error.message
        }, { status: 500 });
    }
};