import { ChordInfo } from 'src/models/chordinfo.model';

export interface CreateSheetInfoDto {
  _id: string;
  bpm: number;
  chord_info: ChordInfo[];
}
