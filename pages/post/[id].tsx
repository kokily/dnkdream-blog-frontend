import type { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import PageTemplate from '../../components/common/PageTemplate';
import { readPostAPI } from '../../libs/api/posts';

const ReadPostPage: NextPage = () => {
  return <PageTemplate>ReadPostPage</PageTemplate>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id?: string } = context.query;
  const queryClient = new QueryClient();

  const response = await queryClient.prefetchQuery('post', () =>
    readPostAPI(id!)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default ReadPostPage;
