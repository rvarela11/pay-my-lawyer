import { useEffect } from 'react';
import { useLocation } from 'react-router';

// The browser looks for the hash target before React renders the page, so scroll to it once it exists.
// Inter Tight loads with font-display: swap, so the text above rewraps when it arrives and pushes the target under the
// header. Wait for fonts first; they're still loading here even when cached.
export const useScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }
    let cancelled = false;
    // jsdom has no FontFaceSet.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => {
      if (!cancelled) {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [hash]);
};
