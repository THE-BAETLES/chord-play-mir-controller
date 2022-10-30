export type Chord = {
  csvPath: string;
  midiPath: string;
};

export type SheetChordRequest = {
  bpm: number;
  beats: number[];
  csv_path: string;
  midi_path: string;
};
