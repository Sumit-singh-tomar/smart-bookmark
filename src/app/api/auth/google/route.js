import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req) {
    try {

        await connectDB();

        const { idToken } = await req.json();

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                name,
                image: picture,
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        const res = NextResponse.json({ status: true, message: "User logged in successfully", token, user }, { status: 200 });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            // maxAge: 7 * 24 * 60 * 60,
        });

        return res;
    } catch (error) {
        return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
};