import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title, showHeader, showFooter }) => {
  return (
    <>
      <Head>
        <title>Watchlist | {title}</title>
        <meta property='og:title' content='Watchlist' />
        <meta
          property='og:description'
          content='Find out what films on an icheckmovies list are currently streaming with Netflix and Amazon Prime'
        />
        <meta property='og:image' content='/img/watchlist-banner.webp' />
        <meta property='og:url' content='https://watchlist-eta.vercel.app' />
        <meta property='og:site_name' content='Watchlist' />
        <meta name='twitter:title' content='Watchlist' />
        <meta
          name='twitter:description'
          content=' Find out what films on an icheckmovies list are currently streaming with Netflix and Amazon Prime'
        />
        <meta name='twitter:image' content='/img/watchlist-banner.webp' />
        <meta name='twitter:image:alt' content='Watchlist logo' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:type' content='website' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
      </Head>
      {showHeader && <Header />}
      <div>{children}</div>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
