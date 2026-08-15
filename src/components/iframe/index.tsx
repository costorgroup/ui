import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import createCache, { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createPortal } from 'react-dom';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { GlobalStyles } from '../global-styles';
import { iframeClasses } from './classes';
import { SIframe } from './styles';
import { TIframeProps } from './types';

type TFrameMount = {
  body: HTMLElement;
  cache: EmotionCache;
  document: Document;
};

const getFrameDocument = (iframe: HTMLIFrameElement | null) => {
  try {
    return iframe?.contentDocument ?? iframe?.contentWindow?.document ?? null;
  } catch {
    return null;
  }
};

const Iframe = forwardRef<HTMLIFrameElement, TIframeProps>(
  ({ children, className, onLoad, src, srcDoc, title, ...props }, ref) => {
    const [iframeNode, setIframeNode] = useState<HTMLIFrameElement | null>(
      null,
    );
    const [mount, setMount] = useState<TFrameMount | null>(null);
    const mountRef = useRef<TFrameMount | null>(null);

    const setRefs = useCallback(
      (node: HTMLIFrameElement | null) => {
        setIframeNode(node);

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const attachMount = useCallback((iframe: HTMLIFrameElement | null) => {
      const doc = getFrameDocument(iframe);
      const body = doc?.body ?? null;
      const head = doc?.head ?? null;

      if (!doc || !body || !head) {
        mountRef.current = null;
        setMount(null);
        return;
      }

      body.style.margin = '0';

      if (mountRef.current?.document === doc) {
        setMount(mountRef.current);
        return;
      }

      const next: TFrameMount = {
        body,
        document: doc,
        cache: createCache({
          key: 'cuiiframe',
          container: head,
        }),
      };

      mountRef.current = next;
      setMount(next);
    }, []);

    useEffect(() => {
      attachMount(iframeNode);
    }, [attachMount, iframeNode, src, srcDoc]);

    const handleLoad: React.ReactEventHandler<HTMLIFrameElement> = (event) => {
      attachMount(event.currentTarget);
      onLoad?.(event);
    };

    return (
      <SIframe
        ref={setRefs}
        src={src}
        srcDoc={srcDoc}
        title={title}
        {...props}
        className={mergeClasses(iframeClasses.root, className)}
        onLoad={handleLoad}
      >
        {children != null && mount
          ? createPortal(
              <CacheProvider value={mount.cache}>
                <GlobalStyles />
                {children}
              </CacheProvider>,
              mount.body,
            )
          : null}
      </SIframe>
    );
  },
);

Iframe.displayName = 'Iframe';

export type { TIframeProps } from './types';
export { iframeClasses } from './classes';
export { Iframe };
export default Iframe;
