import { useCallback, useEffect, useState } from 'react';
import { getScrollTop } from '../../utils/scrolls';
import { parseHeading } from '../../utils/toc';

function useToc(html: string) {
  const tocs = parseHeading(html);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [headerTop, setHeaderTop] = useState<TocType[] | null>(null);

  const updateTocPosition = useCallback(() => {
    if (!tocs) return;

    const scrollTop = getScrollTop();
    const headingTops = tocs.map(({ id }) => {
      const el = document.getElementById(id);

      if (!el) {
        return {
          id,
          top: 0,
        };
      }

      const top = el.getBoundingClientRect().top + scrollTop;

      return {
        id,
        top,
      };
    });

    setHeaderTop(headingTops);
  }, []);

  useEffect(() => {
    updateTocPosition();
    let prevScrollHeight = document.body.scrollHeight;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    function checkScrollHeight() {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        updateTocPosition();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(checkScrollHeight, 250);
    }
    timeoutId = setTimeout(checkScrollHeight, 250);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateTocPosition]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();

    if (!headerTop) return;

    const currentHeading = [...headerTop].reverse().find((headTop) => {
      return scrollTop >= headTop.top - 4;
    });

    if (!currentHeading) {
      setActiveId(null);
      return;
    }

    setActiveId(currentHeading.id);
  }, [headerTop]);

  useEffect(() => {
    updateTocPosition();
  }, [updateTocPosition]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return {
    tocs,
    activeId,
  };
}

export default useToc;
