import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        default: "",
    },
    name: {
        type: String,
        trim: true,
        default: "",
    },
    image: {
        type: String,
        trim: true,
        default: "",
    },
}, { timestamps: true });


const User =
    mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
