import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
      href={`https://www.imdb.com/title/${movie.imdbID}`}
      rel='noreferrer noopener'
      target='_blank'
    >
      <div className='bg-gray-800 text-gray-50 font-bodyMain rounded-lg w-96 h-72 flex overflow-hidden shadow-lg'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.imagePath}`}
          className=''
        />
        <div className='grid grid-cols-1 grid-rows-2 py-10 px-5 w-full'>
          <div className='text-center flex flex-col items-center'>
            <h1 className='text-xl font-semibold'>{movie.title}</h1>
            <h2 className='text-sm italic text-gray-300'>{movie.year}</h2>
            <div className='border-t border-gray-100 w-20 mt-5'></div>
          </div>

          <div className='pt-10 text-center px-3'>
            <h3 className='text-xs text-gray-200'>Currently available on:</h3>
            <div className='pt-3 flex'>
              {movie.providerDetails.map((provider) => (
                <img
                  src={`https://image.tmdb.org/t/p/w500${provider.providerLogoPath}`}
                  className='w-10 h-10 rounded-lg mr-2'
                  key={provider.providerLogoPath}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default MovieCard;
