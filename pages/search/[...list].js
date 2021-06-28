import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { MovieListContext } from '../../contexts/MovieListContext';

import Layout from '../../components/layout';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';

const ResultsPage = () => {
  const { allMoviesList, dispatch } = useContext(MovieListContext);

  const [allMoviesListTitle, setAllMoviesListTitle] = useState('');
  const [listRegion, setListRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error404, setError404] = useState(false);
  const [sortBy, setSortBy] = useState('number-asc');

  const router = useRouter();

  const { list } = router.query;

  const getAllMoviesProviderData = async (listData, region) => {
    let allMoviesData = [];
    let index = 0;

    for (const movie of listData.list) {
      const { data: movieDetails } = await axios.post('/api/moviedetails', {
        title: movie.title,
        altTitle: movie.altTitle,
        year: movie.year.toString(),
        index,
      });

      index += 1;

      if (Object.keys(movieDetails).length > 0) {
        try {
          const { data: providerDetails } = await axios.post('/api/streaming', {
            id: movieDetails.id,
            region,
          });

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
    }
    return allMoviesData;
  };

  const getListData = async () => {
    const region = list[0].toUpperCase();
    setListRegion(region);

    let url = '';

    if (list.length > 2) {
      url = `https://icheckmovies.com/lists/${list[1]}/${list[2]}/`;
    } else {
      url = `https://icheckmovies.com/lists/${list[1]}/`;
    }

    try {
      const { data: listData } = await axios.post('/api/scraping', {
        url,
      });

      setAllMoviesListTitle(listData.listTitle);

      const allMoviesData = await getAllMoviesProviderData(listData, region);

      await dispatch({
        type: 'ADD_MOVIES',
        payload: allMoviesData,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
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
        <main className='h-screen bg-gray-50 lg:px-72 mb-32'>
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
      <main className='min-h-screen bg-gray-50 2xl:px-72 lg:px-8 iPadProWidescreen:px-8 iPadWidescreen:px-8 iPadPro:px-8 mb-32'>
        <div className='2xl:px-8 lg:px-3 flex lg:flex-row flex-col items-center justify-between'>
          <div className='text-center lg:text-left'>
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
              className='px-5 py-2 rounded-md shadow-inner font-bodyMain text-xs lg:text-sm iPadWidescreen:text-xs iPadPro:text-xs focus:outline-none'
            >
              <option value='number-asc'>List Number ASC</option>
              <option value='number-desc'>List Number DESC</option>
              <option value='title-asc'>Title ASC</option>
              <option value='title-desc'>Title DESC</option>
            </select>
          </div>
        </div>
        <div className='2xl:px-8 px-3 lg:mt-0 mt-5'>
          <div className='w-full border-t bg-gray-800 2xl:px-8 px-5'></div>
        </div>
        <ul className='pb-5 grid grid-cols-1 lg:grid-cols-3 iPad:grid-cols-2 iPadPro:grid-cols-2 iPadWidescreen:grid-cols-2'>
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
            <div className='text-center col-span-full mt-20 text-lg lg:text-xl font-bodyMain text-gray-800'>
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
