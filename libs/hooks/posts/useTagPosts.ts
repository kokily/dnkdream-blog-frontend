import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { listPostsAPI } from '../../api/posts';
import useObserver from '../common/useObserver';
import useLocalStorage from 'use-local-storage';

function useTagPosts() {
  const router = useRouter();
  const { tag }: { tag?: string } = router.query;
  const [scrollY, setScrollY] = useLocalStorage('tag_posts_list', 0);
  const queryClient = useQueryClient();
  const { data, fetchNextPage, refetch } = useInfiniteQuery(
    'tagPosts',
    ({ pageParam }) => listPostsAPI({ tag, cursor: pageParam }),
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
  }, [data, tag]);

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
    async function updatePosts() {
      await queryClient.invalidateQueries('tagPosts');
      await refetch();
    }

    updatePosts();
  }, [tag]);

  useEffect(() => {
    if (scrollY !== 0) window.scrollTo(0, Number(scrollY));
  }, []);

  return {
    posts,
    onReadPost,
    onTagPost,
    tag,
    setTarget,
  };
}

export default useTagPosts;
