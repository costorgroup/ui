import { ReactElement } from 'react';

export const isSelectedOption = (child: ReactElement<{ 'aria-selected'?: boolean | 'true' | 'false' }>) => {
  const selected = child.props['aria-selected'];
  return selected === true || selected === 'true';
};
