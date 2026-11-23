import { useEffect } from 'react';
import { useLocation } from 'react-router';

// The browser looks for the hash target before React renders the page, so scroll to it once it exists.
// Web fonts can rewrap the text above it after the first paint, so wait for them first or the target lands under the header.
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
