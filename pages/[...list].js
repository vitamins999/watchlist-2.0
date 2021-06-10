import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../components/layout';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

import { getMovieList, populateMovieList } from '../api/scraping';
import { getMovieDetails, getProviderDetails } from '../api/streamingDetails';

const testData = [
  {
    listNumber: 5,
    id: '424',
    title: "Schindler's List",
    year: '1993',
    imagePath: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    imdbID: 'tt0108052',
    providerDetails: [
      {
        providerName: 'Netflix',
        providerLogoPath: '/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg',
      },
    ],
  },
  {
    listNumber: 10,
    id: '550',
    title: 'Fight Club',
    year: '1999',
    imagePath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    imdbID: 'tt0137523',
    providerDetails: [
      {
        providerName: 'Amazon Prime Video',
        providerLogoPath: '/68MNrwlkpF7WnmNPXLah69CR5cb.jpg',
      },
    ],
  },
  {
    listNumber: 12,
    id: '27205',
    title: 'Inception',
    year: '2010',
    imagePath: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    imdbID: 'tt1375666',
    providerDetails: [
      {
        providerName: 'Amazon Prime Video',
        providerLogoPath: '/68MNrwlkpF7WnmNPXLah69CR5cb.jpg',
      },
    ],
  },
  {
    listNumber: 12,
    id: '27205',
    title: 'Inception',
    year: '2010',
    imagePath: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    imdbID: 'tt1375666',
    providerDetails: [],
  },
  {
    listNumber: 12,
    id: '27205',
    title: 'Here Is A Really Really Long Title: Episode VII',
    year: '2010',
    imagePath: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    imdbID: 'tt1375666',
    providerDetails: [
      {
        providerName: 'Amazon Prime Video',
        providerLogoPath: '/68MNrwlkpF7WnmNPXLah69CR5cb.jpg',
      },
    ],
  },
];

const ResultsPage = () => {
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [allMoviesListTitle, setAllMoviesListTitle] =
    useState("IMDb's Top 250");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('number-asc');

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

  // useEffect(() => {
  //   getListData();
  // }, []);

  const title = 'Search Results';

  if (loading) {
    return (
      <Layout title={title} showHeader>
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
      <main className='h-screen bg-gray-50 px-72 mb-32'>
        <div className='px-8 flex items-center justify-between'>
          <div>
            <h1 className='text-gray-900 font-bodyMain text-3xl pt-20 font-semibold tracking-wide'>
              {allMoviesListTitle}
            </h1>
            <h2 className='text-gray-700 font-bodyMain text-sm pb-10 italic'>
              Region: GB
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
          {testData
            .filter((movie) => {
              return movie.providerDetails.length > 0;
            })
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
            ))}
        </ul>
      </main>
    </Layout>
  );
};

export default ResultsPage;
