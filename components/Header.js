import Image from 'next/image';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

const Header = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ linkURL, region }) => {
    const listName = linkURL.split('.com/lists/')[1];
    window.location = `/search/${region}/${listName}`;
  };

  return (
    <header className='flex lg:flex-row iPad:flex-row flex-col justify-between items-center w-full py-5 iPad:px-10 iPadPro:px-16 iPadProWidescreen:px-16 2xl:px-80 lg:px-10 iPadWidescreen:px-16 bg-gray-200'>
      <Link href='/'>
        <a className='flex lg:mb-0 iPad:mb-0 mb-3'>
          <Image
            src='/icons/icon.webp'
            width={36}
            height={32}
            alt='Watchlist Logo'
          />
          <h1 className='text-3xl font-headingMain text-red-700 cursor-pointer ml-3'>
            Watchlist
          </h1>
        </a>
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex justify-center items-center'
      >
        <div className='flex'>
          <select
            className='mr-2 py-2 pl-3 pr-8 form-select text-xs iPadWidescreen:text-xs iPadPro:text-xs lg:text-sm border-none rounded-md font-bodyMain shadow-inner focus:outline-none'
            required
            {...register('region', {
              required: true,
            })}
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
            className='py-2 px-5 rounded-md lg:w-132 iPad:w-80 iPadWidescreen:w-96 iPadPro:w-96 font-bodyMain text-xs iPadWidescreen:text-xs iPadPro:text-xs lg:text-sm shadow-inner focus:outline-none'
            placeholder='e.g. https://icheckmovies.com/lists/imdbs+top+250/'
            {...register('linkURL', {
              required: true,
              maxLength: 100,
            })}
            required
          />
        </div>
        <button className='lg:-ml-8 iPad:-ml-8 ml-2' type='submit'>
          <svg
            className='w-6 h-6 hover:text-blue-700 transition duration-150'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
        </button>
      </form>
    </header>
  );
};

export default Header;
