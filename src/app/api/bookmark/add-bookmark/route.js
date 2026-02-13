import { verifyJwt } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import BookMark from "@/models/BookMark";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    try {
        const { valid, message } = await verifyJwt(req);

        if (!valid) {
            return NextResponse.json({ status: false, message: message }, { status: 401 });
        }

        const { title, url } = await req.json();

        if (!title || !url) {
            return NextResponse.json({ status: false, message: "Title and URL are required" }, { status: 400 });
        }

        const newBookmark = await BookMark.create({ userId: req?.user?._id, title, url });

        global.bookmarkStreams?.[req.user._id]?.forEach(controller => {
            controller.enqueue(
                `event: bookmark_added\ndata: ${JSON.stringify(newBookmark)}\n\n`
            );
        })

        return NextResponse.json({ status: true, message: "Bookmark created successfully", bookmark: newBookmark }, { status: 201 });
    } catch (error) {
        console.error("Error creating Bookmark:", error);
        return NextResponse.json({ status: false, message: "Server Error", details: error.message }, { status: 500 });
    }
};