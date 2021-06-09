import Image from 'next/image';
import Link from 'next/link';

const Header = ({ listName, region }) => {
  return (
    <header className='shadow-sm flex justify-between items-center w-full py-5 px-80 bg-gray-200'>
      <Link href='/'>
        <a className='flex'>
          <Image src='/icons/icon.webp' width={36} height={32} />
          <h1 className='text-3xl font-headingMain text-red-700 cursor-pointer ml-3'>
            Watchlist
          </h1>
        </a>
      </Link>
    </header>
  );
};

export default Header;
