import { Injectable } from "@nestjs/common";
import { IChordService } from "./chord.interface.service";
import { AxiosService } from "../axios.service";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class ChordService implements IChordService {

    constructor(private readonly axiosService: AxiosService<string,string>,private readonly configService: ConfigService){

    }

    async getMidi(wavPath: string): Promise<string> {
        const port= this.configService.get<string>('CHORD_SERVER_PORT')
        return this.axiosService.getRequest('/chord', {wavPath: wavPath}, Number(port));
    }
}