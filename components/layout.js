import Head from 'next/head';

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>Watchlist | {title}</title>
      </Head>
      <div>{children}</div>
    </>
  );
};

export default Layout;
