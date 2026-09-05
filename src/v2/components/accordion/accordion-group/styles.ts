import styled from '@emotion/styled';
import { TSAccordionGroupProps } from './types';

const customProps = new Set(['radius']);

export const SAccordionGroup = styled('div', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSAccordionGroupProps>`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > [data-accordion-grouped] {
    border-radius: 0;
  }

  & > [data-accordion-grouped]:first-child {
    border-top-left-radius: ${({ theme, radius }) => theme.radius[radius]};
    border-top-right-radius: ${({ theme, radius }) => theme.radius[radius]};
  }

  & > [data-accordion-grouped]:last-child {
    border-bottom-left-radius: ${({ theme, radius }) => theme.radius[radius]};
    border-bottom-right-radius: ${({ theme, radius }) => theme.radius[radius]};
  }

  & > [data-accordion-grouped]:only-child {
    border-radius: ${({ theme, radius }) => theme.radius[radius]};
  }
`;
