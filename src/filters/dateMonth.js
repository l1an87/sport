import { getDateMonthTextList } from '@/utils/date';

export function getDateMonth(date) {
  if (!date) return '';
  const d = new Date(date);
  return getDateMonthTextList()[d.getMonth()];
}

export default {
  install(Vue) {
    Vue.filter('dateMonth', getDateMonth);
  },
};
