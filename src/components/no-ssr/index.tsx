import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TNoSsrProps } from './types';

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const NoSsr = ({ children, defer = false, fallback = null }: TNoSsrProps) => {
  const [mounted, setMounted] = useState(false);

  useEnhancedEffect(() => {
    if (!defer) {
      setMounted(true);
    }
  }, [defer]);

  useEffect(() => {
    if (defer) {
      setMounted(true);
    }
  }, [defer]);

  return <>{mounted ? children : fallback}</>;
};

NoSsr.displayName = 'NoSsr';

export type { TNoSsrProps } from './types';
export { NoSsr };
export default NoSsr;
