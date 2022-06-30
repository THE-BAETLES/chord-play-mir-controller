import { Injectable } from "@nestjs/common";
import { IChordService } from "./chord.interface.service";
import { AxiosService } from "../axios.service";
import { Chord } from "src/entities/chord.entities";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class ChordService implements IChordService {
    constructor(private readonly axiosService: AxiosService<string,Chord>,private readonly configService: ConfigService){

    }

    async getChord(wavPath: string): Promise<Chord> {
        const port= this.configService.get<string>('CHORD_SERVER_PORT')
        const response: Chord = (await this.axiosService.getRequest('/chord', {wavPath: wavPath}, Number(port))).data;
        return response;
    }
}