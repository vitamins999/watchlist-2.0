import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Layout from '../components/layout';

const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ linkURL, region }) => {
    const listName = linkURL.split('.com/lists/')[1];
    router.push(`/search/${region}/${listName}`);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const title = 'Home';

  return (
    <Layout title={title}>
      <main className='relative h-screen w-full bg-watchlistPortrait lg:bg-watchlist iPadPro:bg-watchlistPortrait iPadProWidescreen:bg-watchlistPortrait iPad:bg-watchlistPortrait iPadWidescreen:bg-watchlistPortrait bg-center bg-cover bg-no-repeat flex flex-row justify-center iPadWidescreen:justify-center iPadPro:justify-center iPadProWidescreen:justify-center lg:justify-end'>
        <div className='flex flex-col justify-center lg:items-end iPadProWidescreen:items-center xl:mr-16 2xl:mr-64 xs:-mt-0 -mt-28 iPadProWidescreen:mr-0 z-0'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-headingMain text-5xl lg:text-7xl text-red-700'>
              Watchlist
            </h1>
            <h2 className='font-bodyMain text-xs md:text-sm lg:text-base text-gray-800 tracking-tight lg:tracking-wider'>
              What movies on your list can you watch?
            </h2>
            <p className='max-w-lg mt-10 text-xs md:text-sm lg:px-0 px-5 lg:text-base font-bodyMain text-gray-900 text-center'>
              Welcome to Watchlist: a streaming movie search engine for finding
              out what movies on an{' '}
              <a
                className='underline text-blue-700'
                href='https://icheckmovies.com/'
                rel='noreferrer noopener'
                target='_blank'
              >
                icheckmovies.com
              </a>{' '}
              list are available for you to watch right now on Netflix and
              Amazon Prime Video.
            </p>
            <div className='flex lg:flex-row flex-col lg:py-5 mt-10'>
              <button
                onClick={handleModalOpen}
                className='py-4 px-14 mb-5 lg:mb-0 rounded-md uppercase font-bold text-xs tracking-wider bg-gray-800 text-gray-50 transition duration-150 hover:bg-gray-50 hover:text-gray-800 focus:outline-none font-buttonText'
              >
                Search Now!
              </button>
            </div>
          </div>
        </div>
        {modalOpen && (
          <>
            <div className='absolute h-screen w-full bg-black bg-opacity-50'>
              <button
                onClick={() => setModalOpen(false)}
                className='absolute top-5 right-5 bg-gray-800 rounded-full p-1 cursor-pointer z-20 focus:outline-none hover:bg-gray-700 transition duration-150'
              >
                <svg
                  className='w-10 h-10 text-gray-50 z-10'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='w-full h-screen absolute flex justify-center items-center'>
              <form
                className={`bg-gray-800 py-20 lg:py-20 iPad:py-20 iPadWidescreen:py-20 iPadPro:py-20 iPadProWidescreen:py-20 lg:px-64 iPad:px-20 iPadWidescreen:px-20 iPadPro:px-20 rounded-md flex flex-col items-center`}
                onSubmit={handleSubmit(onSubmit)}
              >
                <p className='pb-8 lg:pb-12 iPad:pb-12 iPadWidescreen:pb-12 iPadPro:pb-12 iPadProWidescreen:pb-12 lg:px-0 px-5 lg:max-w-xl xl:max-w-xl iPadWidescreen:max-w-xl iPadPro:max-w-xl iPad:max-w-xl iPadProWidescreen:max-w-xl text-xs lg:text-base iPad:text-sm iPadWidescreen:text-sm text-center text-gray-100'>
                  Finding out what movies are streaming is easy! Just enter the
                  full URL for the icheckmovies.com list in the box below.
                </p>
                <div className='flex lg:flex-row iPad:flex-row flex-col items-center'>
                  <select
                    className='lg:mr-5 py-2 px-5 lg:mb-0 mb-5 iPad:mb-0 iPad:mr-5 lg:text-sm text-xs iPadWidescreen:text-xs rounded-md font-bodyMain shadow-inner focus:outline-none'
                    required
                    {...register('region')}
                  >
                    <option value='' hidden>
                      Select Region
                    </option>
                    <option value='au'>AU</option>
                    <option value='ca'>CA</option>
                    <option value='de'>DE</option>
                    <option value='es'>ES</option>
                    <option value='fi'>FI</option>
                    <option value='fr'>FR</option>
                    <option value='gb'>GB</option>
                    <option value='ie'>IE</option>
                    <option value='it'>IT</option>
                    <option value='nl'>NL</option>
                    <option value='nz'>NZ</option>
                    <option value='us'>US</option>
                  </select>
                  <input
                    type='url'
                    className='py-2 px-5 rounded-md lg:w-144 w-72 iPad:w-108 font-bodyMain text-xs lg:text-sm iPadWidescreen:text-xs shadow-inner focus:outline-none'
                    placeholder='e.g. https://icheckmovies.com/lists/imdbs+top+250/'
                    {...register('linkURL', {
                      required: true,
                      maxLength: 100,
                    })}
                    required
                  />
                </div>
                <button
                  className='py-4 px-14 mt-8 rounded-md uppercase font-bold text-xs tracking-wider bg-yellow-400 text-gray-800 transition duration-150 hover:bg-gray-100 focus:outline-none font-buttonText'
                  type='submit'
                >
                  Find movies
                </button>
              </form>
            </div>{' '}
          </>
        )}
      </main>
    </Layout>
  );
};

export default HomePage;
