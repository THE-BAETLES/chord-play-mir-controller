export type Sheet = {
    bpm: number;
    info: {
        index: number;
        onset: number;
        offset: number;
        chord: string;
    }[]
}