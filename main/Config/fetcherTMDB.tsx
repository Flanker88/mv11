
import axios from 'axios';

const TIME_OUT = 3000;
const baseTMDB = 'https://api.themoviedb.org/3/';

const axiosInstanceTMDB = axios.create({
  baseURL: baseTMDB,
  timeout: TIME_OUT,
});

export const fetcherTMDB = (url: string) =>
  axiosInstanceTMDB
    .get(url, {
      params: {
        api_key: '8f44559bd5dbfe77fe948fafc01314b3',
      },
    })
    .then(res => res.data);