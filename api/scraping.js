import axios from 'axios';
import cheerio from 'cheerio';
import https from 'https';

axios.defaults.timeout = 60000;
axios.defaults.httpsAgent = new https.Agent({ keepAlive: true });

// Request webpage of icheckmovies list
export const getMovieList = async (checklistURL) => {
  const proxy = 'https://morning-dusk-29674.herokuapp.com/'; // Personal Cors-Anywhere proxy server
  const html = await axios.get(proxy + checklistURL);
  return html;
};

export const populateMovieList = (html) => {
  const $ = cheerio.load(html.data);

  const titles = [];
  const years = [];
  const allMovies = [];

  // Loops through all the film names and checks to see whether it contains the
  // <em> tag (which only occurs if the film name is not in English. In that case, it
  // contains the text of the English name of the film).  If it has the <em> tag, the
  // translated English name is appended to the titles array.  Otherwise the conditional
  // returns false and it simply appends the ordinary English title found in the <h2> tag.
  $('h2').each((i, elem) => {
    if ($(elem).next().find('em').text().trim()) {
      titles[i] = $(elem).next().find('em').text().trim();
    } else {
      titles[i] = $(elem).text().trim();
    }
  });
  // Loops through all the film years and appends them to the years array.
  $('.info').each((i, elem) => {
    years[i] = parseInt($(elem).text().trim().slice(0, 4), 10);
  });

  // Removes first entry in the titles array since it's garbage.
  const listTitle = titles.shift();

  // Creates an object for each film of title and release year and appends the object
  // to the allMovies array.
  titles.forEach((title, index) => {
    const movie = {
      title: title,
      year: years[index],
    };
    allMovies.push(movie);
  });
  return {
    listTitle,
    list: allMovies,
  };
};
