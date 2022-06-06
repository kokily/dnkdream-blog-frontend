import type { NextPage } from 'next';
import useLoggedIn from '../../components/common/hooks/useLoggedIn';
import PageTemplate from '../../components/common/PageTemplate';
import Write from '../../components/write/Write';

const WritePage: NextPage = () => {
  useLoggedIn(true);

  return (
    <PageTemplate left={false} right={false}>
      <Write isEdit={false} />
    </PageTemplate>
  );
};

export default WritePage;
