import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { listPostsAPI } from '../../../libs/api/posts';

function useAllPosts() {
  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>();
  const { data, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(
    'posts',
    ({ pageParam }) => listPostsAPI({ cursor: pageParam }),
    {
      getNextPageParam: (data) =>
        data && data.length === 20 ? data[data.length - 1].id : undefined,
      enabled: true,
    }
  );

  const posts = useMemo(() => {
    if (!data) {
      return [];
    }

    return ([] as PostType[]).concat(...data.pages);
  }, [data]);

  const intersectionObserver = (
    entires: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entires.forEach((entry) => {
      // 관찰 주인 entry가 화면에 보일 경우
      if (entry.isIntersecting) {
        // entry 관찰 해제 후 다음 데이터 요청
        io.unobserve(entry.target);
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (observerRef.current) {
      // 기존 IO가 있을 경우 연결 해제
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [data]);

  return {
    posts,
    loading: isFetchingNextPage,
  };
}

export default useAllPosts;
