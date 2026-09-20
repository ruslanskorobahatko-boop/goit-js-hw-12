import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const perPage = 15;
let currentQuery = '';
let page = 1;

form.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits.length) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    form.reset();

    if (data.totalHits <= page * perPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }

    showLoadMoreButton();
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);

    if (data.totalHits <= page * perPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    const card = gallery.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }
  } catch {
    page -= 1;
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}
