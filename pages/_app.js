import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import "styles/globals.css";
import { useEffect } from "react";
import { Router } from "next/router";
import { AppLayout } from "components/AppLayout";
import * as gtag from "helpers/gtag";
import { Providers } from "providers/providers";
import { TITLE, META_DESCRIPTION, META_IMAGE, URL } from "root/config";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  // Track pages with google analytics
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  // End of track pages with google analytics

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DefaultSeo
        title={TITLE}
        description={META_DESCRIPTION}
        openGraph={{ url: URL, images: [{ url: META_IMAGE }] }}
        twitter={{ cardType: "summary_large_image" }}
      />
      <SessionProvider session={session}>
        <Providers>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </Providers>
      </SessionProvider>
    </>
  );
};

export default App;
