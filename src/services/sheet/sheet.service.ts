import { CreateSheetDto } from "src/dto/CreateSheet.dto";
import { AxiosService } from "../axios.service";
import { ISheetService } from "./sheet.interface.service";
import { Sheet } from "src/entities/sheet.entities";
import { url } from "inspector";
import { ConfigService } from "@nestjs/config";
import { Chord } from "src/entities/chord.entities";

export type GenerateSheetDto = {
    wavPath: string;
    midiPath: string;
    videoInfo: CreateSheetDto;
}

export class SheetService implements ISheetService {
    constructor(private readonly axiosService: AxiosService<Chord,Sheet>,
        private readonly configService: ConfigService) {}

    async getSheet(chordInfo: Chord): Promise<Sheet> {
        const port= this.configService.get<string>('SHEET_SERVER_PORT');
        
        const response = this.axiosService.postRequest('/sheet', {
            csvPath: chordInfo.csvPath,
            midiPath: chordInfo.midiPath
        }, Number(port));

        return response;

    }
}