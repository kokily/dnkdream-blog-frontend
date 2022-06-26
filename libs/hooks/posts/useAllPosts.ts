import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { listPostsAPI } from '../../api/posts';
import useObserver from '../common/useObserver';

function useAllPosts() {
  const router = useRouter();
  const { data, fetchNextPage } = useInfiniteQuery(
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

  const onReadPost = (id: string) => {
    router.push(`/post/${id}`);
  };

  const onTagPost = (tag: string) => {
    console.log(tag);
    router.push(`/tag/${tag}`);
  };

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

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  return {
    posts,
    onReadPost,
    onTagPost,
    setTarget,
  };
}

export default useAllPosts;
