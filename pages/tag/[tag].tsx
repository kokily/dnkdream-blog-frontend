import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import AllPosts from '../../components/posts/AllPosts';
import { listPostsAPI } from '../../libs/api/posts';
import useTagPosts from '../../libs/hooks/posts/useTagPosts';

const TagPostsPage: NextPage = () => {
  const router = useRouter();
  const { tag: id }: { tag?: string } = router.query;
  const { posts, onReadPost, onTagPost, tag, setTarget } = useTagPosts();
  const { data } = useQuery('ssrTagsPosts', () => listPostsAPI({ tag: id }));
  const tags = data?.map((post) => {
    return post.tags.join();
  });
  const description = data?.map((post) => {
    return post.title;
  });

  return (
    <>
      <Head>
        <link rel="canonical" href="https://dnkdream.com/tag" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="D&K Dreams Blog" />
        <meta property="og:url" content={`https://dnkdream.com/tag/${id}`} />
        <meta property="og:description" content={description?.toString()} />
        <meta
          property="og:image"
          content="https://image.dnkdream.com/logo512.png"
        />
        <meta name="keywords" content={tags?.toString()} />
        <meta name="description" content={description?.toString()} />
        <title>{tag} 태그 선택 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate right>
        <AllPosts
          posts={posts}
          onReadPost={onReadPost}
          onTagPost={onTagPost}
          tag={tag}
          setTarget={setTarget}
        />
      </PageTemplate>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tag }: { tag?: string } = context.query;
  const queryClient = new QueryClient();

  if (tag) {
    await queryClient.prefetchQuery(
      'ssrTagsPosts',
      () => listPostsAPI({ tag }),
      {
        staleTime: 1000,
      }
    );
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default TagPostsPage;
