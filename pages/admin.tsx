import type { NextPage } from 'next';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginAdmin from '../components/auth/LoginAdmin';

const AdminPage: NextPage = () => {
  return (
    <AuthTemplate>
      <LoginAdmin />
    </AuthTemplate>
  );
};

export default AdminPage;
