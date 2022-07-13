import { Schema } from "mongoose";

export const ChordInfoSchema = new Schema({
    bpm: Number,
    info: {
        chord: String, 
        start: Number,
        end: Number,
        position: Number
    }
});