import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
  Ref,
} from 'react';

export type TAsProp<C extends ElementType> = {
  as?: C;
};

type TPropsToOmit<C extends ElementType, P> = keyof (TAsProp<C> & P);

export type TPolymorphicProps<
  C extends ElementType,
  Props = object,
> = TAsProp<C> &
  Props &
  Omit<ComponentPropsWithoutRef<C>, TPropsToOmit<C, Props>>;

export type TPolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];

export type TPolymorphicPropsWithRef<
  C extends ElementType,
  Props = object,
> = TPolymorphicProps<C, Props> & {
  ref?: TPolymorphicRef<C>;
};

export type TPolymorphicComponent<
  Default extends ElementType,
  Props = object,
> = (<C extends ElementType = Default>(
  props: TPolymorphicPropsWithRef<C, Props>,
) => ReactElement | null) & {
  displayName?: string;
};

export type TPolymorphicRender<
  Default extends ElementType,
  Props = object,
> = <C extends ElementType = Default>(
  props: TPolymorphicProps<C, Props>,
  ref: Ref<Element>,
) => ReactElement | null;
