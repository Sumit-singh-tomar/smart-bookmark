import { NextResponse } from 'next/server';
import { jwtVerify } from "jose";

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const { payload } = await jwtVerify(token, secret);

        if (payload?.id) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/dashboard'],
};