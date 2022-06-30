import { Injectable } from "@nestjs/common";
import { ISeparateService } from "./separate.interface.service";
import { AxiosResponse } from "axios";
import { AxiosService } from "../axios.service";
import { ConfigService } from "@nestjs/config";
import { Separate } from "src/entities/separate.entities";
import { Sheet } from "src/entities/sheet.entities";
@Injectable()
export class SeparateService implements ISeparateService {

    constructor(private readonly axiosService: AxiosService<string,Separate>,private readonly configService: ConfigService){
    }

    async getWav(videoId: string): Promise<string> {
        const port= this.configService.get<string>('SEPARATE_SERVER_PORT')
        const response: Separate = await (await this.axiosService.getRequest('/separate', {videoId: videoId}, Number(port))).data;
        return response.accompanimentPath;
    }   
}