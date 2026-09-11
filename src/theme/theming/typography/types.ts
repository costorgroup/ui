export type TThemeTypographyHeading = {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
};

export type TThemeTypographyText = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export type TThemeFontWeightScale = {
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
};

export type TThemeTypographyVariant = {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  fontStyle: string;
  lineHeight: number;
};

export type TThemeTypography = {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: TThemeFontWeightScale;
  lineHeight: {
    heading: number;
    text: number;
  };
  heading: TThemeTypographyHeading;
  text: TThemeTypographyText;
  h1: TThemeTypographyVariant;
  h2: TThemeTypographyVariant;
  h3: TThemeTypographyVariant;
  h4: TThemeTypographyVariant;
  h5: TThemeTypographyVariant;
  h6: TThemeTypographyVariant;
  body: TThemeTypographyVariant;
  small: TThemeTypographyVariant;
};

export type TThemeTypographyOptions = {
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: Partial<TThemeFontWeightScale>;
  lineHeight?: Partial<TThemeTypography['lineHeight']>;
  heading?: Partial<TThemeTypographyHeading>;
  text?: Partial<TThemeTypographyText>;
  h1?: Partial<TThemeTypographyVariant>;
  h2?: Partial<TThemeTypographyVariant>;
  h3?: Partial<TThemeTypographyVariant>;
  h4?: Partial<TThemeTypographyVariant>;
  h5?: Partial<TThemeTypographyVariant>;
  h6?: Partial<TThemeTypographyVariant>;
  body?: Partial<TThemeTypographyVariant>;
  small?: Partial<TThemeTypographyVariant>;
};
