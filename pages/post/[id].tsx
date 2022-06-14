import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import ReadPost from '../../components/post/ReadPost';
import TocTest from '../../components/post/TocTest';
import { readPostAPI } from '../../libs/api/posts';
import { useUserState } from '../../libs/context/UserContext';
import useReadPost from '../../libs/hooks/post/useReadPost';

const ReadPostPage: NextPage = () => {
  const [user] = useUserState();
  const {
    post,
    onBack,
    onEdit,
    onTagPost,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
  } = useReadPost();

  return (
    <>
      <Head>
        <title>{post?.title} - D&K Dreams Blog</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${post?.title}`} />
        <meta
          property="og:url"
          content={`https://dnkdream.com/post/${post?.id}`}
        />
        <meta property="og:description" content={`${post?.category}`} />
        <meta property="og:image" content={`${post?.thumbnail}`} />
      </Head>
      <PageTemplate right={post && <TocTest html={post.body} />}>
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
    </>
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
