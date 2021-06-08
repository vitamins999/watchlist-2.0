import Link from 'next/link';

const Header = ({ listName, region }) => {
  return (
    <header className='shadow-sm flex justify-between items-center w-full py-5 px-20 bg-gradient-to-r from-yellow-400 to-yellow-300'>
      <Link href='/'>
        <a>
          <h1 className='text-3xl font-headingMain text-red-700 cursor-pointer'>
            Watchlist
          </h1>
        </a>
      </Link>
    </header>
  );
};

export default Header;
