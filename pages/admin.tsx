import type { NextPage } from 'next';
import Head from 'next/head';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginAdmin from '../components/auth/LoginAdmin';

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>관리자 로그인 - D&K Dreams Blog</title>
      </Head>
      <AuthTemplate>
        <LoginAdmin />
      </AuthTemplate>
    </>
  );
};

export default AdminPage;
