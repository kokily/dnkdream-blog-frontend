import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { listPostsAPI } from '../../api/posts';

function useCategoryPosts() {
  const router = useRouter();
  const { category }: { category?: string } = router.query;
  const observerRef = useRef<IntersectionObserver>();
  const boxRef = useRef<HTMLDivElement>();
  const { data, fetchNextPage } = useInfiniteQuery(
    'tagPosts',
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
  }, [data]);

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

  return {
    posts,
    onReadPost,
    onTagPost,
    category,
  };
}

export default useCategoryPosts;
