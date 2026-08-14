export type TColorFormat =
  | 'hex'
  | 'hexa'
  | 'rgb'
  | 'rgba'
  | 'hsl'
  | 'hsla';

export type TColorRgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type TColorHsv = {
  h: number;
  s: number;
  v: number;
  a: number;
};
