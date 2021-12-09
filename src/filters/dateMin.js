import { getDateMonthTextMinList } from '@/utils/date';

export function getDateMin(date) {
  if (!date) return '';
  const d = new Date(date);
  const month = getDateMonthTextMinList();
  return `${d.getDate()
    .toString()
    .padStart(2, '0')} ${month[d.getMonth()]}`;
}

export default {
  install(Vue) {
    Vue.filter('dateMin', getDateMin);
  },
};
