import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='flex justify-between items-center w-full py-5 px-80 bg-gray-200 font-bodyMain'>
      <a href='#' rel='noreferrer noopener' target='_blank'>
        <h1 className='text-lg text-gray-800 hover:text-blue-700 transition duration-150'>
          © Jools Barnett 2021
        </h1>
      </a>
      <p className='italic'>
        Powered by{' '}
        <a
          href='https://www.justwatch.com'
          rel='noreferrer noopener'
          target='_blank'
          className='text-blue-700 hover:text-blue-900 transition duration-150'
        >
          justwatch.com
        </a>{' '}
        and{' '}
        <a
          href='https://www.themoviedb.org/'
          rel='noreferrer noopener'
          target='_blank'
          className='text-blue-700 hover:text-blue-900 transition duration-150'
        >
          themoviedb.org
        </a>
      </p>
      <a
        href='https://github.com/vitamins999/watchlist-2.0'
        rel='noreferrer noopener'
        target='_blank'
      >
        <Image src='/icons/github-logo-32.png' height={32} width={32} />
      </a>
    </footer>
  );
};

export default Footer;
