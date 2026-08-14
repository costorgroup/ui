export type TThemeTypographyHeading = {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
};

export type TThemeTypographyText = {
  small: string;
  medium: string;
  large: string;
};

export type TThemeTypography = {
  heading: TThemeTypographyHeading;
  text: TThemeTypographyText;
  fontWeight: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    heading: number;
    text: number;
  };
};
