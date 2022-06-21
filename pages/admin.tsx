import type { NextPage } from 'next';
import Head from 'next/head';
import AuthTemplate from '../components/auth/AuthTemplate';
import LoginAdmin from '../components/auth/LoginAdmin';

const AdminPage: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://dnkdream.com/admin" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="D&K Dreams Blog" />
        <meta property="og:url" content="https://dnkdream.com/admin" />
        <meta property="og:description" content="비개발자의 개발 블로그" />
        <meta
          property="og:image"
          content="https://image.dnkdream.com/logo512.png"
        />
        <meta name="keywords" content="blog, tech, develop" />
        <meta name="description" content="관리자 로그인" />
        <title>관리자 로그인 - D&K Dreams Blog</title>
      </Head>
      <AuthTemplate>
        <LoginAdmin />
      </AuthTemplate>
    </>
  );
};

export default AdminPage;
