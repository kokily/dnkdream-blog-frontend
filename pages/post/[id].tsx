import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import ReadPost from '../../components/post/ReadPost';
import { readPostAPI } from '../../libs/api/posts';
import { useUserState } from '../../libs/context/UserContext';
import useReadPost from '../../libs/hooks/post/useReadPost';

const ReadPostPage: NextPage = () => {
  const [user] = useUserState();
  const {
    post,
    next,
    prev,
    onBack,
    onEdit,
    onTagPost,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
  } = useReadPost();

  return (
    <PageTemplate prev={prev ? prev : undefined} next={next ? next : undefined}>
      {post ? (
        <ReadPost
          user={user}
          post={post}
          modal={modal}
          onRemoveClick={onRemoveClick}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onTagPost={onTagPost}
          onBack={onBack}
          onEdit={onEdit}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </PageTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('ssrPost', () => readPostAPI(id!));

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default ReadPostPage;
