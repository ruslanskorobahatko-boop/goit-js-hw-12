import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '57664861-998876c815f7f33043a4b1ff1';

export async function getImagesByQuery(query, page) {
  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
