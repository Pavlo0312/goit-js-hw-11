// src/js/pixabay-api.js
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51688063-4461a08693fd836abbdb4b603';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const { data } = await axios.get(BASE_URL, { params });
  return data;
}
