import axios from 'axios';
import https from 'https';

axios.defaults.timeout = 60000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

const config = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
  host: 'api.themoviedb.org',
};

export const getMovieDetails = async (movieTitle, altTitle, year, number) => {
  let movieData = {};

  const formattedTitle = movieTitle
    .toLowerCase()
    .trim()
    .split(' - ')
    .join('+')
    .split(' ')
    .join('+')
    .split(',')
    .join('')
    .split(':')
    .join('')
    .split('.')
    .join('')
    .split('.')
    .join('')
    .split('·')
    .join('')
    .split("'")
    .join('')
    .normalize('NFD') // Normalises accented characters
    .replace(/[\u0300-\u036f]/g, ''); // for the search string

  const formattedAltTitle = altTitle
    .toLowerCase()
    .trim()
    .split(' - ')
    .join('+')
    .split(' ')
    .join('+')
    .split(',')
    .join('')
    .split(':')
    .join('')
    .split('.')
    .join('')
    .split('.')
    .join('')
    .split('·')
    .join('')
    .split("'")
    .join('')
    .normalize('NFD') // Normalises accented characters
    .replace(/[\u0300-\u036f]/g, ''); // for the search string

  if (altTitle === 'none') {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${formattedTitle}&year=${year}`;

    const { data } = await axios.get(searchUrl, config);

    if (data.results.length > 0) {
      movieData = {
        listNumber: number + 1,
        id: data.results[0].id.toString(),
        title: data.results[0].title,
        year,
        imagePath: data.results[0].poster_path,
      };
    }

    return movieData;
  } else {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${formattedAltTitle}&year=${year}`;

    const { data } = await axios.get(searchUrl, config);

    if (data.results.length > 0) {
      movieData = {
        listNumber: number + 1,
        id: data.results[0].id.toString(),
        title: data.results[0].title,
        year,
        imagePath: data.results[0].poster_path,
      };
    } else {
      const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${formattedTitle}&year=${year}`;

      const { data } = await axios.get(searchUrl, config);

      if (data.results.length > 0) {
        movieData = {
          listNumber: number + 1,
          id: data.results[0].id.toString(),
          title: data.results[0].title,
          year,
          imagePath: data.results[0].poster_path,
        };
      }
    }
    return movieData;
  }
};

export default async function handler(req, res) {
  const data = await getMovieDetails(
    req.body.title,
    req.body.altTitle,
    req.body.year,
    req.body.index
  );

  res.status(200).json(data);
}
