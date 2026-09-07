import { ElementType, ReactNode } from "react";
import type { TPolymorphicProps } from "../../../helpers/polymorphic";
import { TThemeRadius } from "../../../theme/types";
import type { TAppearance } from "../../variant-types";

export type TWindowRadius = keyof TThemeRadius;

export type TWindowAppearance = TAppearance;

export type TWindowOwnProps = {
  children?: ReactNode;
  radius?: TWindowRadius;
  /** `opaque` for canvas fill; `transparent` for see-through shell. */
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

