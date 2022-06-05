import type { NextPage } from 'next';
import useLoggedIn from '../../components/common/hooks/useLoggedIn';
import PageTemplate from '../../components/common/PageTemplate';

const WritePage: NextPage = () => {
  useLoggedIn();

  return (
    <PageTemplate left={false} right={false}>
      WritePage
    </PageTemplate>
  );
};

export default WritePage;
