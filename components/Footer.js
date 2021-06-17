import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='lg:grid lg:grid-cols-3 w-full py-5 2xl:px-80 lg:px-10 iPadWidescreen:px-16 iPadPro:px-16 iPadProWidescreen:px-16 bg-gray-200 font-bodyMain iPadWidescreen:flex iPadWidescreen:flex-col iPadPro:flex iPadPro:flex-col'>
      <a href='#' rel='noreferrer noopener' target='_blank'>
        <h1 className='lg:text-lg text-base iPadWidescreen:text-base iPadPro:text-base flex lg:justify-start iPadWidescreen:justify-center iPadPro:justify-center justify-center text-gray-800 hover:text-blue-700 transition duration-150'>
          © Jools Barnett 2021
        </h1>
      </a>
      <div className='flex justify-center lg:text-base iPadPro:text-sm text-sm iPadWidescreen:text-sm'>
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
      </div>
      <a
        href='https://github.com/vitamins999/watchlist-2.0'
        rel='noreferrer noopener'
        target='_blank'
        className='lg:flex lg:justify-end hidden iPadWidescreen:hidden iPadPro:hidden'
      >
        <Image
          src='/icons/github-logo-32.webp'
          height={32}
          width={32}
          alt='Github Logo'
        />
      </a>
    </footer>
  );
};

export default Footer;
