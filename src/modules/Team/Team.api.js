import api from '@/utils/api';
import { clearState, getState } from '@/utils/state';

const key = '/team';

export const getTeamList = () => getState(key)
  .api(() => api.get('organizationUnit'))
  .then(({ items }) => items.map(i => ({
    ...i,
    value: i.id,
    text: i.name,
  })));

export const getTeam = (id) => getTeamList()
  .then((items) => items.find(i => i.id === +id));

export const clearTeam = () => {
  clearState(key);
};
