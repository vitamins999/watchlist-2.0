import Head from 'next/head';
import Header from './Header';

const Layout = ({ children, title, showHeader, listName, region }) => {
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
      {showHeader && <Header listName={listName} region={region} />}
      <div>{children}</div>
    </>
  );
};

export default Layout;
