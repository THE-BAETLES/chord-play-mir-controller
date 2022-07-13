export interface ChordInfo {
    bpm: number,
    info: {
        chord: string, 
        start: number,
        end: number,
        position: number
    }
}