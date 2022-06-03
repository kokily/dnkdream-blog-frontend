import { useCallback, useEffect, useRef, useState } from 'react';

function useHeader() {
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const onOutsideClick = useCallback((e: any) => {
    if (ref.current && !ref.current.contains(e.target as any)) {
      setMenu(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', onOutsideClick, true);

    return () => {
      window.removeEventListener('click', onOutsideClick, true);
    };
  }, [ref]);

  return {
    ref,
    menu,
    toggleMenu,
    onOutsideClick,
  };
}

export default useHeader;
