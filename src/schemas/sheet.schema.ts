import { Schema } from "mongoose";
export const SheetSchema = new Schema({
    id: String,
    video_id: String,
    user_id: String,
    title: String,
    created_at: Date,
    updated_at: Date,
    like_conut: Number
});


