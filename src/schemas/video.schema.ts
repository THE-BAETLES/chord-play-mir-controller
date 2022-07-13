import { Schema } from 'mongoose';
export const VideoSchema = new Schema({
    id: String,
    thumbnail_path: String,
    title: String,
    singer: String,
    tags: [String],
    difficulty_avg: Number,
    play_count: Number
})