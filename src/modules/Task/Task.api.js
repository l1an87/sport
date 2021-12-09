import api from '@/utils/api';
import { getState, clearState } from '@/utils/state';
import { getSport } from '@/modules/Sport/Sport.api';
import { getTaskType } from '@/modules/TaskType/TaskType.api';
import { getDateTime } from '@/utils/date';


export const getTaskSportList = (data = {}) => {
  const key = `/${data.year || ''}/${data.month || ''}/${data.sport || ''}`;
  return getState(`/task/sport/${key}`)
    .api(() => api.get(`sportstatistics/my/summary/bymonth${key}`))
    .then(({ tasks = [], competitions = [] } = {}) => {
      const items = ([
        ...tasks,
        ...competitions.map(i => {
          i.selectedVariantId = i.rules?.[0]?.id;
          return i;
        }),
      ])
        .map(i => {
          i.sport = getSport(i.sportType);
          i.type = getTaskType(i.competitionType);
          if (i.isCompetition && !i.selectedVariantId) {
            i.selectedVariantId = i.rules[0]?.id;
          }
          return i;
        })
        .reduce((acc, item) => {
          item.rules.forEach(rule => {
            acc.push({
              ...item,
              rule,
              key: `${item.id}/${rule.id}`,
            });
          });
          return acc;
        }, []);
      items.sort((a, b) => getDateTime(b.dateTo) - getDateTime(a.dateTo));
      return items;
    });
};
export const getTaskMyList = () => getState('/task/my')
  .api(() => api.get('sportstatistics/my/accepted'))
  .then(({ tasks = [], competitions = [] } = {}) => {
    competitions = competitions
      .map(i => {
        i.sport = getSport(i.sportType);
        i.type = getTaskType(i.competitionType);
        i.selectedVariantId = i.rules?.[0]?.id;
        return i;
      })
      .filter(i => getDateTime(i.dateTo) > Date.now())
      .filter(i => getDateTime(i.dateFrom) < Date.now())
      .reduce((acc, item) => {
        item.rules.forEach(rule => {
          if (item.selectedVariantId !== rule.id) {
            return;
          }
          acc.push({
            ...item,
            rule,
            key: `${item.id}/${rule.id}`,
          });
        });
        return acc;
      }, []);
    competitions.sort((a, b) => b.progress - a.progress);
    tasks = tasks
      .map(i => {
        i.sport = getSport(i.sportType);
        i.type = getTaskType(i.competitionType);
        return i;
      })
      .filter(i => getDateTime(i.dateTo) > Date.now())
      .filter(i => getDateTime(i.dateFrom) < Date.now())
      .reduce((acc, item) => {
        item.rules.forEach(rule => {
          if (item.selectedVariantId !== rule.id) {
            return;
          }
          acc.push({
            ...item,
            rule,
            key: `${item.id}/${rule.id}`,
          });
        });
        return acc;
      }, []);
    tasks.sort((a, b) => getDateTime(b.dateTo) - getDateTime(a.dateTo));
    return {
      tasks,
      competitions,
    };
  });

export const getTask = (id, ruleId) => api
  .get(`competition/${id}`)
  .then(({ item }) => {
    if (!item) return Promise.reject();
    item.sport = getSport(item.sport);
    item.type = getTaskType(item.type);
    item.rule = ruleId ? item.rules.find(i => i.id === ruleId) : item.rules[0];
    item.key = `${item.id}/${item.rule.id}`;
    item.users = item.participants.filter(i => i.competitionVariantId === +ruleId);
    item.teams = item.users
      .reduce((acc, user) => {
        if (!user.organizationUnitId) {
          return acc;
        }
        let team = acc.find(i => i.id === user.organizationUnitId);
        if (!team) {
          team = {
            id: user.organizationUnitId,
            name: user.organizationUnitName,
            users: [],
            progress: 0,
          };
          acc.push(team);
        }
        team.users.push(user);
        team.progress += user.progress || 0;
        return acc;
      }, []);
    item.teams
      .sort((a, b) => b.progress - a.progress);

    if (item.isCompetition && !item.selectedVariantId) {
      item.selectedVariantId = item.rules[0]?.id;
    }

    return item;
  });

export const acceptTask = (id) => api
  .post(`competition/accept/${id}`)
  .then((data) => {
    clearState();
    return data;
  });

// export const getActivityList = (data = {}) => {
//   const request = {};
//   if (data.userId) {
//     request.userId = data.userId;
//   }
//   if (data.taskId) {
//     request.competitionId = data.taskId;
//   }
//   return getState(`/${data.userId || ''}/${data.taskId || ''}`)
//     .api(() => api.post('activity', request))
//     .then(({ items = [] }) => {
//       const response = items.map(i => ({
//         ...i,
//         sport: getSport(i.sportType),
//         start: new Date(i.startTime),
//       }));
//       response.sort((a, b) => b.start.getTime() - a.start.getTime());
//       return response;
//     });
// };

