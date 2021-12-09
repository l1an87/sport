import api from '@/utils/api';
import { getState } from '@/utils/state';

export const getRatingList = (date, type = 'year') => {
  let data = '';
  const year = new Date(date).getFullYear();

  if (type === 'year') {
    data = `sinceDate=${year - 1}-12-31T21:00:00.000Z&toDate=${year}-12-31T21:00:00.000Z`;
  }
  if (type === 'month') {
    const sDate = new Date(`${year}-${(new Date(date).getMonth() + 1).toString()
      .padStart(2, '0')}-01T21:00:00.000Z`);
    sDate.setDate(1);
    const tDate = new Date(sDate);
    tDate.setMonth(tDate.getMonth() + 1);

    data = `sinceDate=${sDate.toISOString()}&toDate=${tDate.toISOString()}`;
  }
  return getState(`/rating/${data}`)
    .api(() => api.get(`sportstatistics/rating?${data}`))
    .then(({ items }) => {
      items = items.map(i => ({
        ...i,
        prize: i.medals + i.cups + i.stars || 0,
      }));
      const users = items;
      // const users = items.filter(i => i.prize);
      users.sort((a, b) => b.prize - a.prize);
      const teams = users
        .reduce((acc, user) => {
          if (!user.organizationUnitId) {
            return acc;
          }
          let team = acc.find(i => i.id === user.organizationUnitId);
          if (!team) {
            team = {
              id: user.organizationUnitId,
              name: user.organizationUnitName,
              users: 0,
              prize: 0,
              cups: 0,
              medals: 0,
              stars: 0,
            };
            acc.push(team);
          }
          team.users += 1;
          team.prize += user.prize;
          team.cups += user.cups;
          team.medals += user.medals;
          team.stars += user.stars;
          return acc;
        }, []);
      return {
        users,
        teams,
      };
    });
};
