![Watchlist Banner Image](public/img/watchlist-banner.webp)

Hello there, and welcome to _Watchlist_: a serverless Next.js web app for finding out what movies on an https://www.icheckmovies.com list are available to stream right now on Netflix and Amazon Prime.

## Table of Contents <!-- omit in toc -->

- [Demo](#demo)
- [Why Does This Exist?](#why-does-this-exist)
- [How Does It Work?](#how-does-it-work)
- [Technology Used](#technology-used)
- [Current Regions Supported](#current-regions-supported)
- [Run Locally](#run-locally)
- [Environment Variables](#environment-variables)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)

## Demo

[Live Demo](https://watchlistmovies.vercel.app/)

## Why Does This Exist?

There are two main sites on the web that have the ability to curate lists of films: [Letterboxd](https://letterboxd.com/) and [icheckmovies](https://www.icheckmovies.com).

Now, whilst Letterboxd already has the ability to see what films on a curated list are available to stream, the site itself is more intended as a social media platform, rather than having lists of films as the website's main purpose. As such, their list function is a little disorganised and very much centered on user curated lists.

icheckmovies, on the other hand, has a far more organised selection of lists, many of them officially curated by the admin. However, they do not have the ability to see what films on those lists are available for streaming.

There are many people out there (including myself) who prefer to use icheckmovies when deciding on what film they're in the mood to watch, based on what films in a given list they haven't seen yet.

_Watchlist_ was created to solve this problem.

## How Does It Work?

Scraping and API calls to the [The Movie Database](https://www.themoviedb.org/).

To put it simply:

1. The user enters the URL of an [icheckmovies](https://www.icheckmovies.com) list (i.e. https://icheckmovies.com/lists/imdbs+top+250/) and a region.
2. Axios scrapes the url's page. This data is then used to create an object containing the list title and an array of the listed films and their release year.
3. The app loops through this array, making two API calls to The Movie Database for each film. The first call gets the relevant metadata for the film, including the ID for the film on The Movie Database. The second call uses this ID along with the region, to find out what streaming providers in that region are currently streaming the film. If it's either Netflix or Amazon Prime, this information along with the relevant metadata is pushed to an All Films array.
4. Once the loop has finished, the content of the All Films array is displayed to the user.

## Technology Used

- Next.js
- Serverless Functions
- Context API
- Tailwind CSS
- Framer Motion
- Axios
- Cheerio
- React Hook Form

## Current Regions Supported

- Australia
- Canada
- Finland
- France
- Germany
- Ireland
- Italy
- New Zealand
- Spain
- The Netherlands
- United Kingdom
- United States

## Run Locally

Clone the project

```bash
  git clone https://github.com/vitamins999/watchlist-2.0.git
```

Go to the project directory

```bash
  cd watchlist-2.0
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TMDB_TOKEN` - An API key from [The Movie Database](https://www.themoviedb.org/) in the form of a Bearer Token (TMDB provides both a regular API key and a Bearer token. We want the Bearer token).

## License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## Acknowledgements

_Watchlist_ is powered by [JustWatch](https://www.justwatch.com) and [The Movie Database](https://www.themoviedb.org/).

## Authors

- [Jools Barnett](https://www.github.com/vitamins999)
