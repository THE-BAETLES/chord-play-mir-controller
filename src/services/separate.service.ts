import { Injectable } from "@nestjs/common";
import { ISeparateService } from "./separate.interface.service";
import { AxiosService } from "./axios.service";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class SeparateService implements ISeparateService {

    constructor(private readonly axiosService: AxiosService<string,string>,private readonly configService: ConfigService){
            
    }

    async getWav(videoId: string): Promise<string> {
        const port= this.configService.get<string>('SEPARATE_SERVER_PORT')
        return this.axiosService.getRequest('/separate', {videoId: videoId}, Number(port));
    }
}