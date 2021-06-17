import Image from 'next/image';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.15 }}>
      <div className='bg-gray-800 text-gray-50 font-bodyMain rounded-lg lg:w-96 w-80 h-60 lg:h-72 flex overflow-hidden shadow-lg'>
        <div className='relative h-full lg:w-108 w-96'>
          <Image
            src={`https://image.tmdb.org/t/p/w200${movie.imagePath}`}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className='grid grid-cols-1 grid-rows-2 lg:py-10 py-7 px-5 w-full'>
          <div className='text-center flex flex-col items-center'>
            <h1 className='lg:text-xl text-lg font-semibold'>{movie.title}</h1>
            <h2 className='lg:text-sm text-xs italic text-gray-300'>
              {movie.year}
            </h2>
            <div
              className={`${
                movie.title.length > 40 ? 'hidden' : ''
              } border-t border-gray-100 w-20 mt-5`}
            ></div>
          </div>

          <div className='lg:pt-10 pt-3 text-center px-3'>
            <h3 className='text-xs text-gray-200'>Currently available on:</h3>
            <div className='pt-3 flex'>
              {movie.providerDetails.map((provider, index) => (
                <div
                  key={index}
                  className='relative mr-2 lg:w-10 lg:h-10 h-8 w-8'
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${provider.providerLogoPath}`}
                    className='rounded-lg'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
