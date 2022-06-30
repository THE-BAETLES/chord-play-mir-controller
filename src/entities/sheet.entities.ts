export type Sheet = {
    bpm: number;
    info: {
        position: number;
        chord: number;
        start: number;
        end: string;
    }[]
}