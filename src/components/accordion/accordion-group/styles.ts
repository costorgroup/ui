import styled from '@emotion/styled';
import { TSAccordionGroupProps } from './types';

const customProps = new Set(['radius']);

export const SAccordionGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAccordionGroupProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  --accordion-group-radius: ${({ theme, radius }) => theme.radius[radius]};

  > * {
    border-radius: 0;
  }

  > *:not(:first-of-type) {
    margin-top: -1px;
  }

  > *:first-of-type {
    border-top-left-radius: var(--accordion-group-radius);
    border-top-right-radius: var(--accordion-group-radius);
  }

  > *:last-of-type {
    border-bottom-left-radius: var(--accordion-group-radius);
    border-bottom-right-radius: var(--accordion-group-radius);
  }
`;
