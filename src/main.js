// main.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.show({
      message: 'Input field can not be empty. Please enter your query.',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (!data.hits || data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      return;
    }

    // додаємо в DOM за одну операцію усі елементи
    createGallery(data.hits);
  } catch (err) {
    iziToast.show({
      message: `Error: ${err?.message || err}`,
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});
