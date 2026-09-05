import { ElementType, ReactNode } from "react";
import type { TPolymorphicProps } from "../../../helpers/polymorphic";
import { TThemeRadius } from "../../../theme/types";

export type TWindowRadius = keyof TThemeRadius;

export type TWindowAppearance = "solid" | "transparent";

export type TWindowOwnProps = {
  children?: ReactNode;
  radius?: TWindowRadius;
  /** `transparent` for frosted shell; `solid` for flat surface fill. */
  appearance?: TWindowAppearance;
};

export type TWindowProps<C extends ElementType = "div"> = TPolymorphicProps<
  C,
  TWindowOwnProps
>;

export type TSWindowProps = {
  radius: TWindowRadius;
  appearance: TWindowAppearance;
};

