import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { verifyJwt } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();
    try {
        const { valid, message } = await verifyJwt(request);

        if (!valid) {
            return NextResponse.json({ status: false, message: message }, { status: 401 });
        }

        return NextResponse.json({ status: true, message: "Authorized", user: request?.user }, { status: 200 });
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ status: false, message: "Invalid token" }, { status: 401 });
    }
};