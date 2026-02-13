import { verifyJwt } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import BookMark from "@/models/BookMark";
import { NextResponse } from "next/server";

export async function GET(req) {
    await connectDB();

    try {
        const { valid, message } = await verifyJwt(req);

        if (!valid) {
            return NextResponse.json({ status: false, message: message }, { status: 401 });
        }

        const newBookmark = await BookMark.find({ userId: req?.user?._id });

        return NextResponse.json({ status: true, message: "Bookmarks retrieved successfully", bookmarks: newBookmark }, { status: 201 });
    } catch (error) {
        console.error("Error retrieving Bookmarks:", error);
        return NextResponse.json({ status: false, message: "Server Error", details: error.message }, { status: 500 });
    }
};