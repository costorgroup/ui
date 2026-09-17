import styled from '@emotion/styled';
import { Panel } from '../panel';
import { cardFooterClasses } from './card-footer/classes';
import { cardImageClasses } from './card-image/classes';
import { TSCardProps } from './types';

const customProps = new Set(['size']);

const SPACING: Record<TSCardProps['size'], number> = {
  sm: 3,
  md: 4,
  lg: 5,
};

export const SCard = styled(Panel, {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSCardProps>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  --card-spacing: ${({ theme, size }) => theme.spacing(SPACING[size])};
  gap: var(--card-spacing);
  padding-block: var(--card-spacing);

  &:has(> .${cardImageClasses.root}:first-child) {
    padding-top: 0;
  }

  &:has(> .${cardFooterClasses.root}) {
    padding-bottom: 0;
  }
`;
