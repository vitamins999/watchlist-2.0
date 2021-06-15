import '../styles/globals.css';
import MovieListContextProvider from '../contexts/MovieListContext';

function MyApp({ Component, pageProps }) {
  return (
    <MovieListContextProvider>
      <Component {...pageProps} />
    </MovieListContextProvider>
  );
}

export default MyApp;
