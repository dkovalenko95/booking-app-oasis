
import { useEffect, useRef } from 'react';

export function useOutsideClick(fn, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    const clickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        fn();
      };
    };
    
    document.addEventListener('click', clickHandler, listenCapturing);

    // Cleanup
    return () => document.removeEventListener('click', clickHandler, listenCapturing);
  }, [fn, listenCapturing]);

  return {
    ref,
  };
};
