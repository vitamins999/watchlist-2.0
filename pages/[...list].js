import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { MovieListContext } from '../contexts/MovieListContext';

import Layout from '../components/layout';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

import { getMovieList, populateMovieList } from '../api/scraping';
import { getMovieDetails, getProviderDetails } from '../api/streamingDetails';

const ResultsPage = () => {
  const { allMoviesList, dispatch } = useContext(MovieListContext);

  const [allMoviesListTitle, setAllMoviesListTitle] = useState('');
  const [listRegion, setListRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error404, setError404] = useState(false);
  const [sortBy, setSortBy] = useState('number-asc');

  const router = useRouter();

  const { list } = router.query;

  const getAllMoviesProviderData = async (listData) => {
    setAllMoviesListTitle(listData.listTitle);

    const region = list[0].toUpperCase();
    setListRegion(region);

    let allMoviesData = [];
    let index = 0;

    for (const movie of listData.list) {
      const movieDetails = await getMovieDetails(
        movie.title,
        movie.year.toString(),
        index
      );

      index += 1;

      try {
        const providerDetails = await getProviderDetails(
          movieDetails.id,
          region
        );
        if (providerDetails.length > 0) {
          allMoviesData.push({
            ...movieDetails,
            providerDetails,
          });
        }
      } catch (error) {
        console.log('Error with movie ' + movie.title);
        console.log(error);
      }
    }

    await dispatch({
      type: 'ADD_MOVIES',
      payload: allMoviesData,
    });
  };

  const getListData = async () => {
    let url = '';

    if (list.length > 2) {
      url = `https://icheckmovies.com/lists/${list[1]}/${list[2]}/`;
    } else {
      url = `https://icheckmovies.com/lists/${list[1]}/`;
    }

    try {
      const html = await getMovieList(url);
      const movieList = populateMovieList(html);
      await getAllMoviesProviderData(movieList);

      setLoading(false);
    } catch (error) {
      setError404(true);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    dispatch({
      type: 'RESET_MOVIE_LIST',
    });
    getListData();
  }, [router.isReady]);

  const title = 'Search Results';

  if (error404) {
    return (
      <Layout title={title} showHeader showFooter>
        <main className='h-screen bg-gray-50 px-72 mb-32'>
          <div className='px-8 py-72 flex flex-col items-center justify-center'>
            <h1 className='font-bodyMain text-7xl pb-20'>404 ERROR</h1>
            <h1 className='font-bodyMain text-lg text-gray-800'>
              Whoops! Seems something went wrong with either the{' '}
              <a
                href='https://www.icheckmovies.com/'
                rel='noreferrer noopener'
                target='_blank'
                className='text-blue-700 hover:text-blue-900 transition duration-150'
              >
                icheckmovies.com
              </a>{' '}
              URL or{' '}
              <a
                href='https://www.themoviedb.org/'
                rel='noreferrer noopener'
                target='_blank'
                className='text-blue-700 hover:text-blue-900 transition duration-150'
              >
                themoviedb.org
              </a>
              .
            </h1>
            <h2 className='font-bodyMain text-lg text-gray-800'>
              Check the URL is correct and the full address and try again. If
              the problem persists, check{' '}
              <a
                href='https://www.icheckmovies.com/'
                rel='noreferrer noopener'
                target='_blank'
                className='text-blue-700 hover:text-blue-900 transition duration-150'
              >
                icheckmovies.com
              </a>{' '}
              or{' '}
              <a
                href='https://www.themoviedb.org/'
                rel='noreferrer noopener'
                target='_blank'
                className='text-blue-700 hover:text-blue-900 transition duration-150'
              >
                themoviedb.org
              </a>{' '}
              isn't down.
            </h2>
          </div>
        </main>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title={title} showHeader showFooter>
        <main className='h-screen bg-gray-50 px-72 mb-32'>
          <div className='px-8 py-72 flex flex-col items-center justify-center'>
            <Loader />
            <h1 className='font-bodyMain text-lg text-gray-800'>
              Getting movie info...
            </h1>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={title} showHeader showFooter>
      <main className=' bg-gray-50 px-72 mb-32'>
        <div className='px-8 flex items-center justify-between'>
          <div>
            <h1 className='text-gray-900 font-bodyMain text-3xl pt-20 font-semibold tracking-wide'>
              {allMoviesListTitle}
            </h1>
            <h2 className='text-gray-700 font-bodyMain text-sm pb-10 italic'>
              Region: {listRegion}
            </h2>
          </div>
          <div className='flex justify-between items-center'>
            <select
              onChange={(e) => setSortBy(e.target.value)}
              defaultValue='number-asc'
              className='px-5 py-2 rounded-md shadow-inner font-bodyMain text-sm focus:outline-none'
            >
              <option value='number-asc'>List Number ASC</option>
              <option value='number-desc'>List Number DESC</option>
              <option value='title-asc'>Title ASC</option>
              <option value='title-desc'>Title DESC</option>
            </select>
          </div>
        </div>
        <div className='px-8'>
          <div className='w-full border-t bg-gray-800 px-8'></div>
        </div>
        <ul className='pb-5 grid grid-cols-3'>
          {allMoviesList.length > 0 ? (
            allMoviesList
              .sort((a, b) => {
                if (sortBy === 'number-asc') {
                  return a.listNumber - b.listNumber;
                }
                if (sortBy === 'number-desc') {
                  return b.listNumber - a.listNumber;
                }
                if (sortBy === 'title-asc') {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                }
                if (sortBy === 'title-desc') {
                  if (a.title > b.title) {
                    return -1;
                  }
                  if (a.title < b.title) {
                    return 1;
                  }
                  return 0;
                }
              })
              .map((movie) => (
                <li key={uuidv4()} className='flex flex-col items-center pt-10'>
                  <h2 className='text-gray-900 py-5 font-bodyMain'>
                    {movie.listNumber}
                  </h2>
                  <MovieCard movie={movie} />
                </li>
              ))
          ) : (
            <div className='text-center col-span-full mt-20 text-xl font-bodyMain text-gray-800'>
              <h1>
                Sorry! It appears that list has no movies available for
                streaming in your selected region.
              </h1>
              <h2 className='mt-5'>How about trying another list?</h2>
            </div>
          )}
        </ul>
      </main>
    </Layout>
  );
};

export default ResultsPage;
