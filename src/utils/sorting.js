export const sortByName = (items, label = 'name') => {
  items.sort((a, b) => (a[label] > b[label] ? 1 : -1));
  return items;
};
