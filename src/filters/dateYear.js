export function getDateYear(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.getFullYear();
}

export default {
  install(Vue) {
    Vue.filter('dateYear', getDateYear);
  },
};
