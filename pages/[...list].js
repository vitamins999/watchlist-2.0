import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/layout';

import { getMovieList, populateMovieList } from '../api/scraping';
import { getMovieDetails, getProviderDetails } from '../api/streamingDetails';

const ResultsPage = () => {
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [allMoviesListTitle, setAllMoviesListTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { list } = router.query;

  const getAllMoviesProviderData = async (listData) => {
    setAllMoviesListTitle(listData.listTitle);

    await listData.list.forEach(async (movie, index) => {
      const movieDetails = await getMovieDetails(
        movie.title,
        movie.year.toString(),
        index
      );

      try {
        const providerDetails = await getProviderDetails(movieDetails.id);

        setAllMoviesList((prevData) => [
          ...prevData,
          {
            ...movieDetails,
            providerDetails,
          },
        ]);
      } catch (error) {
        console.log('Error with movie ' + movie.title);
        console.log(error);
      }
    });
  };

  const getListData = async () => {
    const url = 'https://icheckmovies.com/lists/imdbs+top+250/';
    const html = await getMovieList(url);
    const movieList = populateMovieList(html);

    await getAllMoviesProviderData(movieList);

    setLoading(false);
  };

  useEffect(() => {
    allMoviesList.length = 0;
    getListData();
  }, []);

  const title = 'Search Results';

  if (loading) {
    return (
      <Layout title={title}>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout title={title}>
      <h1>{allMoviesListTitle}</h1>
      <ul>
        {allMoviesList
          .sort((a, b) => {
            return a.listNumber - b.listNumber;
          })
          .map((movie) => (
            <li key={parseInt(movie.id)}>{movie.title}</li>
          ))}
      </ul>
    </Layout>
  );
};

export default ResultsPage;
