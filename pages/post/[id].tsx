import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import ReadPost from '../../components/post/ReadPost';
import PostToc from '../../components/post/PostToc';
import { readPostAPI } from '../../libs/api/posts';
import { useUserState } from '../../libs/context/UserContext';
import useReadPost from '../../libs/hooks/post/useReadPost';

const ReadPostPage: NextPage = () => {
  const router = useRouter();
  const { id }: { id?: string } = router.query;
  const [user] = useUserState();
  const {
    post,
    onBack,
    onEdit,
    onTagPost,
    onSharePost,
    modal,
    onRemoveClick,
    onCancel,
    onConfirm,
  } = useReadPost();
  const { data, isLoading, error } = useQuery('ssrPost', () =>
    readPostAPI(id!)
  );
  const tags = data?.post?.tags.join();
  const description = data?.post?.body
    .replace(/ /gi, '')
    .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi, '')
    .substring(0, 50);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://dnkdream.com/post/${data?.post?.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${data?.post?.title}`} />
        <meta
          property="og:url"
          content={`https://dnkdream.com/post/${data?.post?.id}`}
        />
        <meta property="og:description" content={`${data?.post?.category}`} />
        <meta property="og:image" content={`${data?.post?.thumbnail}`} />
        <meta name="keywords" content={tags} />
        <meta name="description" content={description} />
        <title>{data?.post?.title} - D&K Dreams Blog</title>
      </Head>
      <PageTemplate right={post && <PostToc html={post.body} />}>
        {data && data.post && (
          <ReadPost
            user={user}
            post={data.post}
            modal={modal}
            onRemoveClick={onRemoveClick}
            onCancel={onCancel}
            onConfirm={onConfirm}
            onTagPost={onTagPost}
            onSharePost={onSharePost}
            onBack={onBack}
            onEdit={onEdit}
          />
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
