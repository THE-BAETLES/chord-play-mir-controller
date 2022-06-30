import { Chord } from "src/entities/chord.entities";

export interface IChordService {
    getChord(wavPath:string): Promise<Chord>;
}