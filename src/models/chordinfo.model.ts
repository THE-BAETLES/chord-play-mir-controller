export interface ChordInfo {
  start: number;
  end: number;
  root: string;
  triad: string;
  bass: string | 'none';
  position: number;
}
