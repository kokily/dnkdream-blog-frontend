import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { listPostsAPI } from '../../api/posts';

function useCategoryPosts() {
  const router = useRouter();
  const { category }: { category?: string } = router.query;
  const queryClient = useQueryClient();
  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>();
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

  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(intersectionObserver);
    boxRef.current && observerRef.current.observe(boxRef.current);
  }, [posts]);

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
  };
}

export default useCategoryPosts;
