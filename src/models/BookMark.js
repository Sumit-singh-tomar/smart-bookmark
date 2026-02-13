import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

export default mongoose.models.Bookmark ||
    mongoose.model('Bookmark', bookmarkSchema);