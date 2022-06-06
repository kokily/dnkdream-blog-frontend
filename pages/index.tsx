import type { NextPage } from 'next';
import PageTemplate from '../components/common/PageTemplate';
import AllPosts from '../components/posts/AllPosts';
import useAllPosts from '../libs/hooks/posts/useAllPosts';

const IndexPage: NextPage = () => {
  const { posts, onReadPost, onTagPost } = useAllPosts();

  return (
    <PageTemplate next={posts.length > 1 ? posts[1] : undefined}>
      <AllPosts posts={posts} onReadPost={onReadPost} onTagPost={onTagPost} />
    </PageTemplate>
  );
};

export default IndexPage;
