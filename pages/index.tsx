import type { NextPage } from 'next';
import PageTemplate from '../components/common/PageTemplate';
import AllPosts from '../components/posts/AllPosts';
import useAllPosts from '../libs/hooks/posts/useAllPosts';

const IndexPage: NextPage = () => {
  const { posts, onReadPost } = useAllPosts();

  return (
    <PageTemplate>
      <AllPosts posts={posts} onReadPost={onReadPost} />
    </PageTemplate>
  );
};

export default IndexPage;
