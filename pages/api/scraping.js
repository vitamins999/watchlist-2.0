import axios from 'axios';
import cheerio from 'cheerio';
import https from 'https';

axios.defaults.timeout = 60000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

// Request webpage of icheckmovies list
export const getMovieList = async (checklistURL) => {
  const html = await axios.get(checklistURL);
  return html;
};

export const populateMovieList = (html) => {
  const $ = cheerio.load(html.data);

  let allMovies = [];

  const listTitle = $('h1').text().trim();

  $('.listItemMovie').each((i, elem) => {
    const title = $(elem).find('h2').text().trim();
    let altTitle = $(elem).find('em').text().trim();

    if (!altTitle) {
      altTitle = 'none';
    }

    const year = parseInt($(elem).find('.info').text().trim(), 10);

    allMovies.push({
      title,
      altTitle,
      year,
    });
  });

  return {
    listTitle,
    list: allMovies,
  };
};

export default async function handler(req, res) {
  const html = await getMovieList(req.body.url);
  const movieList = populateMovieList(html);

  res.status(200).json(movieList);
}
