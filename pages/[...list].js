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
    let url = '';

    if (list.length > 2) {
      url = `https://icheckmovies.com/lists/${list[1]}/${list[2]}/`;
    } else {
      url = `https://icheckmovies.com/lists/${list[1]}/`;
    }

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
      <Layout title={title} showHeader>
        <main className='h-screen bg-gradient-to-r from-yellow-400 to-yellow-300 px-20 py-5'>
          <h1>Loading...</h1>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={title} showHeader>
      <main className='h-screen bg-gradient-to-r from-yellow-400 to-yellow-300 px-20 py-5'>
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
      </main>
    </Layout>
  );
};

export default ResultsPage;
