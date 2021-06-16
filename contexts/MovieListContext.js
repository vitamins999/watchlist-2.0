import { createContext, useReducer } from 'react';
import { movieListReducer } from '../reducers/movieListReducer';

export const MovieListContext = createContext();

const MovieListContextProvider = ({ children }) => {
  const [allMoviesList, dispatch] = useReducer(movieListReducer, []);

  return (
    <MovieListContext.Provider value={{ allMoviesList, dispatch }}>
      {children}
    </MovieListContext.Provider>
  );
};

export default MovieListContextProvider;
