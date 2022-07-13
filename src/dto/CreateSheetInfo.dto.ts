import { ChordInfo } from "src/models/chordinfo.model";

export interface CreateSheetInfoDto {
    _id: string;
    chord_info: ChordInfo;
}
