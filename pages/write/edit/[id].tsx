import type { NextPage } from 'next';
import useLoggedIn from '../../../components/common/hooks/useLoggedIn';
import PageTemplate from '../../../components/common/PageTemplate';

const EditPage: NextPage = () => {
  useLoggedIn();

  return (
    <PageTemplate left={false} right={false}>
      EditPage
    </PageTemplate>
  );
};

export default EditPage;
