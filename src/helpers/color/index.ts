import type { TColorFormat, TColorHsv, TColorRgba } from './types';

export const COLOR_FORMATS: TColorFormat[] = [
  'hex',
  'hexa',
  'rgb',
  'rgba',
  'hsl',
  'hsla',
];

const ALPHA_FORMATS: TColorFormat[] = ['hexa', 'rgba', 'hsla'];

export const isAlphaFormat = (format: TColorFormat) =>
  ALPHA_FORMATS.includes(format);

export const stripAlphaFormat = (format: TColorFormat): TColorFormat => {
  switch (format) {
    case 'hexa':
      return 'hex';
    case 'rgba':
      return 'rgb';
    case 'hsla':
      return 'hsl';
    default:
      return format;
  }
};

export const resolveColorFormat = (
  format: TColorFormat,
  allowAlpha: boolean,
  formats?: TColorFormat[],
): TColorFormat => {
  const allowed = (formats?.length ? formats : COLOR_FORMATS).filter(
    (item) => allowAlpha || !isAlphaFormat(item),
  );
  const preferred = allowAlpha ? format : stripAlphaFormat(format);
  if (allowed.includes(preferred)) {
    return preferred;
  }
  return allowed[0] ?? 'hex';
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const toByte = (value: number) => clamp(Math.round(value), 0, 255);

const parseHexChannel = (value: string) => parseInt(value, 16);

const expandHex = (value: string) => {
  if (value.length === 3 || value.length === 4) {
    return value
      .split('')
      .map((char) => `${char}${char}`)
      .join('');
  }
  return value;
};

export const rgbaToHex = (color: TColorRgba, withAlpha: boolean) => {
  const r = toByte(color.r).toString(16).padStart(2, '0');
  const g = toByte(color.g).toString(16).padStart(2, '0');
  const b = toByte(color.b).toString(16).padStart(2, '0');
  if (!withAlpha) {
    return `#${r}${g}${b}`;
  }
  const a = toByte(color.a * 255)
    .toString(16)
    .padStart(2, '0');
  return `#${r}${g}${b}${a}`;
};

export const rgbToHsl = (color: TColorRgba) => {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      default:
        h = (r - g) / delta + 4;
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: color.a,
  };
};

export const hslToRgb = (
  h: number,
  s: number,
  l: number,
  a = 1,
): TColorRgba => {
  const sat = clamp(s, 0, 100) / 100;
  const light = clamp(l, 0, 100) / 100;
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = light - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (hue < 60) {
    r = c;
    g = x;
  } else if (hue < 120) {
    r = x;
    g = c;
  } else if (hue < 180) {
    g = c;
    b = x;
  } else if (hue < 240) {
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: toByte((r + m) * 255),
    g: toByte((g + m) * 255),
    b: toByte((b + m) * 255),
    a: clamp(a, 0, 1),
  };
};

export const rgbToHsv = (color: TColorRgba): TColorHsv => {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / delta) % 6;
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      default:
        h = (r - g) / delta + 4;
    }
    h *= 60;
    if (h < 0) {
      h += 360;
    }
  }

  return {
    h,
    s: max === 0 ? 0 : delta / max,
    v: max,
    a: color.a,
  };
};

export const hsvToRgb = (
  h: number,
  s: number,
  v: number,
  a = 1,
): TColorRgba => {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s, 0, 1);
  const val = clamp(v, 0, 1);
  const c = val * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - c;
  let r = 0;
  let g = 0;
  let b = 0;

  if (hue < 60) {
    r = c;
    g = x;
  } else if (hue < 120) {
    r = x;
    g = c;
  } else if (hue < 180) {
    g = c;
    b = x;
  } else if (hue < 240) {
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: toByte((r + m) * 255),
    g: toByte((g + m) * 255),
    b: toByte((b + m) * 255),
    a: clamp(a, 0, 1),
  };
};

export const parseColor = (value: string): TColorRgba | null => {
  const raw = value.trim();
  if (!raw) {
    return null;
  }

  const hexMatch = raw.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);
  if (hexMatch) {
    const hex = expandHex(hexMatch[1].toLowerCase());
    const r = parseHexChannel(hex.slice(0, 2));
    const g = parseHexChannel(hex.slice(2, 4));
    const b = parseHexChannel(hex.slice(4, 6));
    const a =
      hex.length === 8 ? parseHexChannel(hex.slice(6, 8)) / 255 : 1;
    return { r, g, b, a };
  }

  const rgbMatch = raw.match(
    /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i,
  );
  if (rgbMatch) {
    return {
      r: toByte(Number(rgbMatch[1])),
      g: toByte(Number(rgbMatch[2])),
      b: toByte(Number(rgbMatch[3])),
      a: rgbMatch[4] != null ? clamp(Number(rgbMatch[4]), 0, 1) : 1,
    };
  }

  const hslMatch = raw.match(
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i,
  );
  if (hslMatch) {
    return hslToRgb(
      Number(hslMatch[1]),
      Number(hslMatch[2]),
      Number(hslMatch[3]),
      hslMatch[4] != null ? clamp(Number(hslMatch[4]), 0, 1) : 1,
    );
  }

  return null;
};

export const formatColor = (color: TColorRgba, format: TColorFormat) => {
  const opaque = { ...color, a: isAlphaFormat(format) ? color.a : 1 };

  switch (format) {
    case 'hex':
      return rgbaToHex(opaque, false);
    case 'hexa':
      return rgbaToHex(opaque, true);
    case 'rgb':
      return `rgb(${toByte(opaque.r)}, ${toByte(opaque.g)}, ${toByte(opaque.b)})`;
    case 'rgba':
      return `rgba(${toByte(opaque.r)}, ${toByte(opaque.g)}, ${toByte(opaque.b)}, ${Number(opaque.a.toFixed(3))})`;
    case 'hsl': {
      const hsl = rgbToHsl(opaque);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    case 'hsla': {
      const hsl = rgbToHsl(opaque);
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${Number(hsl.a.toFixed(3))})`;
    }
    default:
      return rgbaToHex(opaque, true);
  }
};

export type {
  TColorFormat,
  TColorRgba,
  TColorHsv,
} from './types';
