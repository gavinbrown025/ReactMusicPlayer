import { useState, useEffect } from 'react';

const useMediaQuery = ( width, query = "max") => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
      const media = window.matchMedia(`(${query}-width: ${width}px)`);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
export default useMediaQuery