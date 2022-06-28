import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import useLocalStorage from 'use-local-storage';
import { listPostsAPI } from '../../api/posts';
import useObserver from '../common/useObserver';

function useCategoryPosts() {
  const router = useRouter();
  const { category }: { category?: string } = router.query;
  const [scrollY, setScrollY] = useLocalStorage('category_posts_list', 0);
  const queryClient = useQueryClient();
  const { data, fetchNextPage } = useInfiniteQuery(
    'categoryPosts',
    ({ pageParam }) => listPostsAPI({ category, cursor: pageParam }),
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
  }, [data, category]);

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

  useEffect(() => {
    async function updatePosts() {
      await queryClient.clear();
    }

    updatePosts();
  }, [category]);

  return {
    posts,
    onReadPost,
    onTagPost,
    category,
    setTarget,
  };
}

export default useCategoryPosts;
