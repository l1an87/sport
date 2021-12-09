const items = [
  {
    id: 1,
    name: 'Звезда',
    icon: 'mdi-star',
  },
  {
    id: 2,
    name: 'Медаль',
    icon: 'mdi-medal',
  },
  {
    id: 3,
    name: 'Кубок',
    icon: 'mdi-cards-diamond',
  },
];

export const getTaskBonusList = () => items.map(i => ({
  ...i,
  value: i.id,
  text: i.name,
}));

export const getTaskBonus = (id) => getTaskBonusList()
  .find(i => i.id === +id);
