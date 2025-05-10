//I defined all the schemas here
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }

}, { timestamps: true })

const user = mongoose.model('User', userSchema)

const snippetSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    language: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const snippet = mongoose.model('Snippet', snippetSchema)

export { user, snippet };