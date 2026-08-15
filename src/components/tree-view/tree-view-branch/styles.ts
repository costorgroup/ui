import styled from '@emotion/styled';

type TSTreeViewBranchProps = {
  level: number;
};

const customProps = new Set(['level']);

export const STreeViewBranch = styled('ul', {
  shouldForwardProp: (prop) => !customProps.has(prop),
})<TSTreeViewBranchProps>`
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(
      var(--tree-view-pad, 0.5rem) + (${({ level }) => Math.max(level - 1, 0)}) *
        var(--tree-view-indent, 1.5rem) + var(--tree-view-icon, 1.15em) / 2
    );
    width: 1px;
    background-color: ${({ theme }) =>
      `color-mix(in srgb, ${theme.colors.common.black} 16%, transparent)`};
    pointer-events: none;
  }

  &[hidden] {
    display: none;
  }
`;
