// src/lib/auth.js
import User from "@/models/User";
import Member from "@/models/User";
import jwt from "jsonwebtoken";

export const verifyJwt = async (req) => {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) return { valid: false, message: "No token provided" };

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (error) {
            console.error("JWT decoding error:", error);
            if (error.name === "TokenExpiredError")
                return { valid: false, message: "Token expired" };
            return { valid: false, message: "Invalid token" };
        }

        const user = await User.findById(decoded.id);

        if (user) {
            req.user = user;
        }

        if (req.user) {
            return { valid: true, message: "User authenticated" };
        } else {
            return { valid: false, message: "User not authenticate, Please Re-login" };
        }
    } catch (error) {
        console.error("JWT verification error:", error);
        return { valid: false, message: "Invalid token" };
    }
};