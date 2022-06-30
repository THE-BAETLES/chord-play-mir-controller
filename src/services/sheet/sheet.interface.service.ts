import { CreateSheetDto } from "src/dto/CreateSheet.dto";
import { Sheet } from "src/entities/sheet.entities";
import { Chord } from "src/entities/chord.entities";

export interface ISheetService {
    getSheet(chord: Chord): Promise<Sheet>;
}