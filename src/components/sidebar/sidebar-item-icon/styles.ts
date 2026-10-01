import styled from '@emotion/styled';

// A square cell the height of the item with the glyph centred, so the
// glyph's surrounding space is the icon's padding. No overflow clipping:
// a Badge around the glyph must be able to hang off its corner.
export const SSidebarItemIcon = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--sidebar-item-size);
  height: var(--sidebar-item-size);
  color: inherit;

  svg,
  img {
    display: block;
    flex-shrink: 0;
    width: var(--sidebar-icon-size);
    height: var(--sidebar-icon-size);
  }

  img {
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
