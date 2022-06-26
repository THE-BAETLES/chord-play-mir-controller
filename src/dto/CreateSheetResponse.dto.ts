import { Sheet } from "src/entities/sheet.entities";
export interface CreateSheetResponseDto {
    success: boolean;
    payload: Sheet;
}