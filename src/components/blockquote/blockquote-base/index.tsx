import React, { Children, forwardRef, isValidElement, ReactNode } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { BlockquoteContext } from '../context';
import { blockquoteBaseClasses } from './classes';
import { SBlockquoteBase, SBlockquoteStack } from './styles';
import { TBlockquoteBaseProps } from './types';

const isPart = (child: ReactNode, name: string) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === name;

const BlockquoteBase = forwardRef<HTMLQuoteElement, TBlockquoteBaseProps>(
  (
    {
      children,
      color = 'default',
      variant = 'solid',
      className,
      ...props
    },
    ref,
  ) => {
    const rails: ReactNode[] = [];
    const icons: ReactNode[] = [];
    const contents: ReactNode[] = [];
    const captions: ReactNode[] = [];
    const rest: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (isPart(child, 'BlockquoteRail')) {
        rails.push(child);
      } else if (isPart(child, 'BlockquoteIcon')) {
        icons.push(child);
      } else if (isPart(child, 'BlockquoteContent')) {
        contents.push(child);
      } else if (isPart(child, 'BlockquoteCaption')) {
        captions.push(child);
      } else {
        rest.push(child);
      }
    });

    const body = [...contents, ...rest, ...captions];

    return (
      <BlockquoteContext.Provider value={{ color, variant }}>
        <SBlockquoteBase
          ref={ref}
          {...props}
          className={mergeClasses(blockquoteBaseClasses.root, className)}
        >
          {rails}
          {icons}
          {body.length > 0 ? (
            <SBlockquoteStack className={blockquoteBaseClasses.stack}>
              {body}
            </SBlockquoteStack>
          ) : null}
        </SBlockquoteBase>
      </BlockquoteContext.Provider>
    );
  },
);

BlockquoteBase.displayName = 'BlockquoteBase';

export type { TBlockquoteBaseProps };
export { blockquoteBaseClasses } from './classes';
export { BlockquoteBase };
export default BlockquoteBase;
