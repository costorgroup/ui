import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { cardContentClasses } from './classes';
import { SCardContent } from './styles';
import { TCardContentProps } from './types';

const CardContent = forwardRef<HTMLDivElement, TCardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SCardContent
        ref={ref}
        {...props}
        className={mergeClasses(cardContentClasses.root, className)}
      >
        {children}
      </SCardContent>
    );
  },
);

CardContent.displayName = 'CardContent';

export type { TCardContentProps };
export { cardContentClasses } from './classes';
export { CardContent };
export default CardContent;
