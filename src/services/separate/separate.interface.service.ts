export interface ISeparateService {
    getWav(videoId: string): Promise<string>;
}