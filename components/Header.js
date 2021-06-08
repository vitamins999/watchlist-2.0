import Link from 'next/link';

const Header = ({ listName, region }) => {
  return (
    <header className='fixed shadow-sm flex justify-between items-center w-full py-5 px-20 bg-gradient-to-r from-yellow-400 to-yellow-300'>
      <Link href='/'>
        <a>
          <h1 className='text-3xl font-headingMain text-red-700 cursor-pointer'>
            Watchlist
          </h1>
        </a>
      </Link>
      <div className='text-center'>
        <h2 className='text-xl font-bold tracking-wide text-red-700 font-bodyMain'>
          {listName}
        </h2>
        <h3 className='text-sm font-bodyMain text-gray-900'>
          Region: {region.toUpperCase()}
        </h3>
      </div>
    </header>
  );
};

export default Header;
