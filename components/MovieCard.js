import Image from 'next/image';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
      rel='noreferrer noopener'
      target='_blank'
    >
      <div className='bg-gray-800 text-gray-50 font-bodyMain rounded-lg w-96 h-72 flex overflow-hidden shadow-lg'>
        <Image
          src={`https://image.tmdb.org/t/p/w200${movie.imagePath}`}
          width={450}
          height={500}
          alt={`${movie.title} Poster`}
        />
        <div className='grid grid-cols-1 grid-rows-2 py-10 px-5 w-full'>
          <div className='text-center flex flex-col items-center'>
            <h1 className='text-xl font-semibold'>{movie.title}</h1>
            <h2 className='text-sm italic text-gray-300'>{movie.year}</h2>
            <div
              className={`${
                movie.title.length > 40 ? 'hidden' : ''
              } border-t border-gray-100 w-20 mt-5`}
            ></div>
          </div>

          <div className='pt-10 text-center px-3'>
            <h3 className='text-xs text-gray-200'>Currently available on:</h3>
            <div className='pt-3 flex'>
              {movie.providerDetails.map((provider) => (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${provider.providerLogoPath}`}
                  className='w-10 h-10 rounded-lg mr-2'
                  key={provider.providerLogoPath}
                  width={40}
                  height={40}
                  alt={`${provider.providerName} Logo`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
