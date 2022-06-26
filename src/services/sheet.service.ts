import { CreateSheetDto } from "src/dto/CreateSheet.dto";
import { AxiosService } from "./axios.service";
import { ISheetService } from "./sheet.interface.service";
import { Sheet } from "src/entities/sheet.entities";
import { url } from "inspector";
import { ConfigService } from "@nestjs/config";

export type GenerateSheetDto = {
    wavPath: string;
    midiPath: string;
    videoInfo: CreateSheetDto;
}

export class SheetService implements ISheetService {
    constructor(private readonly axiosService: AxiosService<GenerateSheetDto,Sheet>,
        private readonly configService: ConfigService) {}

    async getSheet(wavPath: string, midiPath: string, sheet: CreateSheetDto): Promise<Sheet> {
        const port= this.configService.get<string>('SHEET_SERVER_PORT');

        return this.axiosService.postRequest('/sheet', {
            wavPath: wavPath,
            midiPath: midiPath,
            videoInfo: sheet
        }, Number(port))
    }
}