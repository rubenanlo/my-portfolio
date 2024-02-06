import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { GA_TRACKING_ID } from "root/config";
import { ICON } from "root/config";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" href={ICON} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      {/* eslint-disable-next-line */}
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@400"
        rel="stylesheet"
      />
      <link
        href="https://blogfonts.com/css/aWQ9MTc1MjA1JnN1Yj0yMDUmYz1jJnR0Zj1DaGFsa0JvYXJkLWpFUmQ3LnR0ZiZuPWNoYWxrLWJvYXJk/Chalk Board.ttf"
        rel="stylesheet"
        type="text/css"
      />

      {/* Global Site Tag - Google Analytics */}
      <Script
        async
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
      {/* End of Global Site Tag - Google Analytics */}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
