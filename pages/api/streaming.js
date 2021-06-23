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

export const getProviderDetails = async (id, region) => {
  const providerUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;

  const { data: providerData } = await axios.get(providerUrl, config);

  let providerDetails = [];

  providerData.results?.[region]?.flatrate?.forEach((provider) => {
    if (provider.provider_id === 8) {
      providerDetails.push({
        providerName: 'Netflix',
        providerLogoPath: provider.logo_path,
      });
    }
    if (provider.provider_id === 9) {
      providerDetails.push({
        providerName: 'Amazon Prime Video',
        providerLogoPath: provider.logo_path,
      });
    }
    if (provider.provider_id === 103) {
      providerDetails.push({
        providerName: 'All 4',
        providerLogoPath: provider.logo_path,
      });
    }
    if (provider.provider_id === 333) {
      providerDetails.push({
        providerName: 'My5',
        providerLogoPath: provider.logo_path,
      });
    }
    if (provider.provider_id === 38) {
      providerDetails.push({
        providerName: 'BBC iPlayer',
        providerLogoPath: provider.logo_path,
      });
    }
    if (provider.provider_id === 41) {
      providerDetails.push({
        providerName: 'ITV Player',
        providerLogoPath: provider.logo_path,
      });
    }
  });

  return providerDetails;
};

export default async function handler(req, res) {
  const data = await getProviderDetails(req.body.id, req.body.region);

  res.status(200).json(data);
}
