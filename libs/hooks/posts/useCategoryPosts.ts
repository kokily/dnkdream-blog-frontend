import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { listPostsAPI } from '../../api/posts';
import useObserver from '../common/useObserver';

function useCategoryPosts() {
  const router = useRouter();
  const { category }: { category?: string } = router.query;
  const queryClient = useQueryClient();
  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    'categoryPosts',
    ({ pageParam }) => listPostsAPI({ category, cursor: pageParam }),
    {
      getNextPageParam: (data) =>
        data && data.length === 20 ? data[data.length - 1].id : undefined,
    }
  );

  const posts = useMemo(() => {
    if (!data) {
      return [];
    }

    return ([] as PostType[]).concat(...data.pages);
  }, [data, category]);

  const onReadPost = (id: string) => {
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
    async function updatePosts() {
      await queryClient.invalidateQueries('categoryPosts');
      await refetch();
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
