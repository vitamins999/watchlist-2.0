import Head from 'next/head';

const Layout = ({ children, title }) => {
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
      <div>{children}</div>
    </>
  );
};

export default Layout;
