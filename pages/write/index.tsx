import type { NextPage } from 'next';
import useLoggedIn from '../../components/common/hooks/useLoggedIn';
import PageTemplate from '../../components/common/PageTemplate';
import Write from '../../components/write/Write';

const WritePage: NextPage = () => {
  useLoggedIn();

  return (
    <PageTemplate left={false} right={false}>
      <Write />
    </PageTemplate>
  );
};

export default WritePage;
