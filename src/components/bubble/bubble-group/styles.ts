import styled from '@emotion/styled';
import { bubbleContentClasses } from '../bubble-content/classes';

export const SBubbleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(theme.gap.xs)};
  width: 100%;
  min-width: 0;

  & > [data-bubble]:not(:last-of-type) {
    margin-bottom: 0;
  }

  & > [data-bubble][data-align='start']:not(:last-of-type)
    .${bubbleContentClasses.root} {
    border-bottom-left-radius: ${({ theme }) => theme.radius.sm};
  }

  & > [data-bubble][data-align='start']:not(:first-of-type)
    .${bubbleContentClasses.root} {
    border-top-left-radius: ${({ theme }) => theme.radius.sm};
  }

  & > [data-bubble][data-align='end']:not(:last-of-type)
    .${bubbleContentClasses.root} {
    border-bottom-right-radius: ${({ theme }) => theme.radius.sm};
  }

  & > [data-bubble][data-align='end']:not(:first-of-type)
    .${bubbleContentClasses.root} {
    border-top-right-radius: ${({ theme }) => theme.radius.sm};
  }
`;
