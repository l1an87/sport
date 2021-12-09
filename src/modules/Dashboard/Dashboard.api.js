import api from '@/utils/api';
import { getState, clearState } from '@/utils/state';

const key = '/dashboard';

export const getDashboardData = () => getState(key)
  .api(() => api.get('SportStatistics/my/trainings'))
  .then(({ items }) => items);

export const clearDashboard = () => {
  clearState(key);
};
