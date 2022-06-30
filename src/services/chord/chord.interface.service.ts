import { Chord } from "src/entities/chord.entities";

export interface IChordService {
    getMidi(wavPath:string): Promise<Chord>;
}