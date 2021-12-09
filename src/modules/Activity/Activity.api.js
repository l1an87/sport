import polyline from 'polyline-encoded';
import api from '@/utils/api';
import { getState, clearState } from '@/utils/state';
import { getSport } from '@/modules/Sport/Sport.api';

export const getActivityList = (data = {}) => {
  const request = {};
  if (data.userId) {
    request.userId = data.userId;
  }
  if (data.taskId) {
    request.competitionId = data.taskId;
  }
  return getState(`/${data.userId || ''}/${data.taskId || ''}`)
    .api(() => api.post('activity', request))
    .then(({ items = [] }) => {
      const response = items.map(i => ({
        ...i,
        sport: getSport(i.sportType),
        start: new Date(i.startTime),
      }));
      response.sort((a, b) => b.start.getTime() - a.start.getTime());
      return response;
    });
};

export const getActivity = (id) => api
  .get(`activity/${id}`)
  .then(({ item }) => {
    item.points = item.mapData ? polyline.decode(item.mapData) : [];
    item.sport = getSport(item.sportType);
    item.start = new Date(item.startTime);
    return item;
  });

export const hideActivity = (id) => api
  .post(`activity/${id}/hidden`, { hide: true });

export const showActivity = (id) => api
  .post(`activity/${id}/hidden`, { hide: false });

export const addActivity = (data) => api.put('activity', { activity: data })
  .then((response) => {
    clearState();
    return response;
  });

export const addActivityPhoto = (id, file) => {
  const data = new FormData();
  data.set('file', file);
  return api.post(`activity/${id}/photo`, data);
};
