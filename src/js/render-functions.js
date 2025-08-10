// src/js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

// Один екземпляр лайтбокса на сторінку
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="stat-container">
          <div><span><b>Likes</b></span><span>${likes}</span></div>
          <div><span><b>Views</b></span><span>${views}</span></div>
          <div><span><b>Comments</b></span><span>${comments}</span></div>
          <div><span><b>Downloads</b></span><span>${downloads}</span></div>
        </div>
      </li>`
    )
    .join('');

  // Додаємо за одну операцію
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.style.display = 'inline-block';
}

export function hideLoader() {
  loaderEl.style.display = 'none';
}
