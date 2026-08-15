import styled from '@emotion/styled';
import { accordionClasses } from '../classes';
import { accordionBaseClasses } from '../accordion-base/classes';
import { TSAccordionGroupProps } from './types';

const customProps = new Set(['radius']);

const itemSelector = `& > .${accordionBaseClasses.root}, & > .${accordionClasses.root}`;
const nextItem = `+ .${accordionBaseClasses.root}, + .${accordionClasses.root}`;
const itemClass = `.${accordionBaseClasses.root}, .${accordionClasses.root}`;

export const SAccordionGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAccordionGroupProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  --accordion-group-radius: ${({ theme, radius }) => theme.radius[radius]};

  ${itemSelector} {
    border-radius: 0;
  }

  ${itemSelector}:nth-child(1 of ${itemClass}) {
    border-top-left-radius: var(--accordion-group-radius);
    border-top-right-radius: var(--accordion-group-radius);
  }

  ${itemSelector}:not(:has(${nextItem})) {
    border-bottom-left-radius: var(--accordion-group-radius);
    border-bottom-right-radius: var(--accordion-group-radius);
  }

  ${itemSelector} {
    & + .${accordionBaseClasses.root},
    & + .${accordionClasses.root} {
      margin-top: -1px;
    }
  }
`;
