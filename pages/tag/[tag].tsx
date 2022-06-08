import type { NextPage } from 'next';
import PageTemplate from '../../components/common/PageTemplate';
import AllPosts from '../../components/posts/AllPosts';
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

export default TagPostsPage;
