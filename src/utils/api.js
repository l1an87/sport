import axios from 'axios';
import { store } from '@/store';

export default class api {
  static defaultUrl = '/competitionapi/';
  static redirectUrl = '';

  static get(url, props) {
    return axios
      .get(`${api.defaultUrl}${url}`, props)
      .then(({ data }) => data, api.catch);
  }

  static post(url, dt, props) {
    return axios
      .post(`${api.defaultUrl}${url}`, dt, props)
      .then(({ data }) => data, api.catch);
  }

  static put(url, dt, props) {
    return axios
      .put(`${api.defaultUrl}${url}`, dt, props)
      .then(({ data }) => data, api.catch);
  }

  static del(url, id, props) {
    return axios
      .delete(`${api.defaultUrl}${url}/${id}`, props)
      .then(({ data }) => data, api.catch);
  }

  static catch(e) {
    if (!axios.isCancel(e)) {
      if (e.response.config.url === '/competitionapi/account/me') {
        return e;
      }
      if (e.response.status === 401) {
        store.dispatch('init');
      }
    }
    return e;
  }

  static mapOptions(data, { value = 'id', label = 'name', sort = false } = {}) {
    const items = data.items.map(i => ({
      ...i,
      value: i[value],
      text: i[label],
    }));
    if (sort) {
      items.sort((a, b) => (a[label] > b[label] ? 1 : -1));
    }
    return items;
  }
}
