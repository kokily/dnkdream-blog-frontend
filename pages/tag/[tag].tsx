import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import AllPosts from '../../components/posts/AllPosts';
import { listPostsAPI } from '../../libs/api/posts';
import useTagPosts from '../../libs/hooks/posts/useTagPosts';

const TagPostsPage: NextPage = () => {
  const { posts, onReadPost, onTagPost, tag } = useTagPosts();

  return (
    <PageTemplate>
      <AllPosts
        posts={posts}
        onReadPost={onReadPost}
        onTagPost={onTagPost}
        tag={tag}
      />
    </PageTemplate>
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
