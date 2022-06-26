export interface IChordService {
    getMidi(wavPath: string): Promise<string>;
}