import { Separate } from "src/entities/separate.entities";

export interface ISeparateService {
    getWav(videoId: string): Promise<Separate>;
}