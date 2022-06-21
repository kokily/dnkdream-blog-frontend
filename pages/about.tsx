import type { NextPage } from 'next';
import Head from 'next/head';
import About from '../components/about/About';
import PageTemplate from '../components/common/PageTemplate';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://dnkdream.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="D&K Dreams Blog" />
        <meta property="og:url" content="https://dnkdream.com" />
        <meta property="og:description" content="비개발자의 개발 블로그" />
        <meta
          property="og:image"
          content="https://image.dnkdream.com/logo512.png"
        />
        <meta name="keywords" content="소개, D&K, dnk, blog, develop" />
        <meta name="description" content="D&K dreams blog 관리자 소개" />
        <title>비개발자 블로그 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate right={false}>
        <About />
      </PageTemplate>
    </>
  );
};

export default AboutPage;
