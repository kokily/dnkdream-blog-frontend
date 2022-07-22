import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from '../libs/context/UserContext';
import * as ga from '../libs/utils/ga';
import GlobalStyle from '../styles';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const queryClientRef = useRef<QueryClient>();
  const router = useRouter();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  useEffect(() => {
    function handleRouteChange(url: URL) {
      ga.pageView(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/assets/logo192.png" />
        <meta
          name="naver-site-verification"
          content="8538c2d2cda20e8aedc196b49ba0f8ccc7b4dde0"
        />
        <meta
          name="google-site-verification"
          content="8tl7dJru1oZk2hSD7Mhr0rpZ2QE68a15_C9Ny8JiBbQ"
        />
        <title>D&K Dreams Blog - Welcome</title>
      </Head>
      <Script
        async
        id="google_analytics"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}`}
      />
      <Script
        id="google_tag"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
          `,
        }}
      />
      <Script
        strategy="beforeInteractive"
        src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"
      />

      <GlobalStyle />

      <UserContextProvider>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserContextProvider>

      <ToastContainer position="top-right" draggable={false} />
    </>
  );
};

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default App;
