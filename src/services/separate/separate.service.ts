import { Injectable } from "@nestjs/common";
import { ISeparateService } from "./separate.interface.service";
import { AxiosResponse } from "axios";
import { AxiosService } from "../axios.service";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class SeparateService implements ISeparateService {

    constructor(private readonly axiosService: AxiosService<string,string>,private readonly configService: ConfigService){
    }

    async getWav(videoId: string): Promise<string> {
        const port= this.configService.get<string>('SEPARATE_SERVER_PORT')
        const response: AxiosResponse<string> = await this.axiosService.getRequest('/separate', {videoId: videoId}, Number(port));
        return response.data;
    }
}