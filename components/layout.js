import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title, showHeader, showFooter }) => {
  return (
    <>
      <Head>
        <title>Watchlist | {title}</title>
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
