import { CreateSheetDto } from "src/dto/CreateSheet.dto";
import { Sheet } from "src/entities/sheet.entities";

export interface ISheetService {
    getSheet(wavPath: string, midiPath: string, sheet: CreateSheetDto): Promise<Sheet>;
}