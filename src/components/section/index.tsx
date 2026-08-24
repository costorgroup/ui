import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { sectionClasses } from './classes';
import { SectionGroupContext } from './section-group/context';
import { SectionContent } from './section-content';
import { SectionTitle } from './section-title';
import { sectionTitleClasses } from './section-title/classes';
import { SSection, SSectionPathMarker } from './styles';
import { TSectionProps } from './types';

const PathMarker = () => (
  <SSectionPathMarker
    className={sectionTitleClasses.marker}
    aria-hidden
  />
);

const Section = forwardRef<HTMLElement, TSectionProps>(
  ({ children, title, className, ...props }, ref) => {
    const group = useContext(SectionGroupContext);
    const align = group?.align ?? 'left';
    const color = group?.color ?? ('primary' as const);
    const variant = group?.variant ?? 'halo';
    const index = group?.index ?? 0;
    const count = group?.count ?? 1;
    const isFirst = index === 0;
    const isLast = index >= count - 1;
    const showNodes = variant === 'dot' || variant === 'halo';

    let body = children;

    if (title != null) {
      if (align === 'center') {
        body = (
          <>
            {showNodes && !isFirst ? <PathMarker /> : null}
            <SectionTitle showMarker={false}>{title}</SectionTitle>
            {children != null ? (
              <SectionContent>{children}</SectionContent>
            ) : null}
            {showNodes && !isLast ? <PathMarker /> : null}
          </>
        );
      } else {
        body = (
          <>
            <SectionTitle showMarker={showNodes}>{title}</SectionTitle>
            {children != null ? (
              <SectionContent>{children}</SectionContent>
            ) : null}
          </>
        );
      }
    }

    return (
      <SSection
        ref={ref}
        align={align}
        color={color}
        {...props}
        className={mergeClasses(
          sectionClasses.root,
          align === 'left' && sectionClasses.alignLeft,
          align === 'center' && sectionClasses.alignCenter,
          align === 'right' && sectionClasses.alignRight,
          className,
        )}
      >
        {body}
      </SSection>
    );
  },
);

Section.displayName = 'Section';

export type { TSectionProps } from './types';
export { sectionClasses } from './classes';
export { SSectionPathMarker as SectionPathMarker } from './styles';
export { Section };
export default Section;
