import { Sheet } from 'src/entities/sheet.entities';

export interface PostSheetResponseDto {
  success: boolean;
  payload: Sheet;
}
