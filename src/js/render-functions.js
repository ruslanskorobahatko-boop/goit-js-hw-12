import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
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
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="gallery-info">
              <p><b>Likes</b><span>${likes}</span></p>
              <p><b>Views</b><span>${views}</span></p>
              <p><b>Comments</b><span>${comments}</span></p>
              <p><b>Downloads</b><span>${downloads}</span></p>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}
