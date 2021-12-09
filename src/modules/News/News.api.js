import api from '@/utils/api';
import { getState } from '@/utils/state';
import { getDateTime } from '@/utils/date';

export const getNewsList = () => getState('/news/my')
  .api(() => api.get('news/my'))
  .then(({ items }) => {
    items.sort((a, b) => getDateTime(b.publicationDate) - getDateTime(a.publicationDate));
    return items;
  });

export const getNews = (id) => api
  .get(`news/${id}`)
  .then(({ item }) => item);
