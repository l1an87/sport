export default {
  install(Vue) {
    Vue.filter('nameParticipant', (size) => {
      if (size === 1) return `${size} участник`;
      if (size > 4 && size < 21) return `${size} участников`;
      if (size % 10 === 1 || size % 10 === 2 || size % 10 === 3) return `${size} участника`;
      return `${size} участников`;
    });
  },
};
