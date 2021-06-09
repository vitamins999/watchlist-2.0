import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import MovieCard from '../components/MovieCard';

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

  // if (loading) {
  //   return (
  //     <Layout
  //       title={title}
  //       showHeader
  //       listName='Getting List Info...'
  //       region={list[0]}
  //     >
  //       <main className='h-screen bg-gray-50 px-20 py-24'>
  //         <h1>Loading...</h1>
  //       </main>
  //     </Layout>
  //   );
  // }

  return (
    <Layout title={title} showHeader showFooter>
      <main className='h-screen bg-gray-50 px-72 mb-32'>
        <div className='px-8'>
          <h1 className='text-gray-900 font-bodyMain text-3xl pt-20 font-semibold tracking-wide'>
            {allMoviesListTitle}
          </h1>
          <h2 className='text-gray-700 font-bodyMain text-sm pb-10 italic'>
            Region: GB
          </h2>
          <div className='w-full border-t bg-gray-800'></div>
        </div>
        <ul className='pb-5 grid grid-cols-3'>
          {testData
            .sort((a, b) => {
              return a.listNumber - b.listNumber;
            })
            .map((movie) => (
              <li
                key={parseInt(movie.id)}
                className='flex flex-col items-center pt-10'
              >
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
