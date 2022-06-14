import type { NextPage } from 'next';
import Head from 'next/head';
import About from '../components/about/About';
import PageTemplate from '../components/common/PageTemplate';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>비개발자 블로그 - D&K Dreams Blog</title>
      </Head>
      <PageTemplate right={false}>
        <About />
      </PageTemplate>
    </>
  );
};

export default AboutPage;
