import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { listPostsAPI } from '../../api/posts';
import useObserver from '../common/useObserver';
import useLocalStorage from 'use-local-storage';

function useAllPosts() {
  const router = useRouter();
  const [scrollY, setScrollY] = useLocalStorage('all_list_posts', 0);
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
    setScrollY(window.scrollY);
    router.push(`/post/${id}`);
  };

  const onTagPost = (tag: string) => {
    router.push(`/tag/${tag}`);
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    entry.isIntersecting && fetchNextPage();
  };

  const { setTarget } = useObserver({ onIntersect });

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    posts,
    onReadPost,
    onTagPost,
    setTarget,
  };
}

export default useAllPosts;
