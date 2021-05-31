import { useRouter } from 'next/router';

import Layout from '../components/layout';

const ResultsPage = () => {
  const router = useRouter();
  const { list } = router.query;

  const title = 'Search Results';

  return (
    <Layout title={title}>
      <h1>Search Results Page</h1>
      <h2>{list[0]}</h2>
      <h2>{list[1]}</h2>
    </Layout>
  );
};

export default ResultsPage;
