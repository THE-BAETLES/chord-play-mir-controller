import { PostSheetDto } from "src/dto/PostSheet.dto";
import { Chord } from "src/entities/chord.entities";
import { GenerateMode } from "./sheet.service";

export interface ISheetService {
    createSheet(sheetDto: PostSheetDto, mode: GenerateMode);
}