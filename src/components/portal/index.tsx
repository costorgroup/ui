import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TPortalProps } from './types';

const Portal = ({
  children,
  container,
  disabled = false,
}: TPortalProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (disabled) {
    return <>{children}</>;
  }

  if (!ready || typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, container ?? document.body);
};

Portal.displayName = 'Portal';

export type { TPortalProps } from './types';
export { Portal };
export default Portal;
