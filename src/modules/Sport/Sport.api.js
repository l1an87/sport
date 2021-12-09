const items = [
  {
    id: 1,
    name: 'Бег',
    icon: 'mdi-run',
    color: 'blue',
  },
  {
    id: 2,
    name: 'Ходьба',
    icon: 'mdi-walk',
    color: 'green',
  },
  {
    id: 3,
    name: 'Лыжи',
    icon: 'mdi-ski-cross-country',
    color: 'cyan',
  },
  {
    id: 4,
    name: 'Велосипед',
    icon: 'mdi-bike',
    color: 'orange',
  },
  {
    id: 5,
    name: 'SportFit',
    icon: 'mdi-weight-lifter',
    color: 'teal',
  },
  {
    id: 6,
    name: 'Плаванье',
    icon: 'mdi-swim',
    color: 'light-blue',
  },
  {
    id: 7,
    name: 'Игровые виды спорта',
    icon: 'mdi-basketball',
    color: 'deep-orange',
  },
];

export const getSportList = () => items.map(i => ({
  ...i,
  value: i.id,
  text: i.name,
}));

export const getSport = (id) => getSportList()
  .find(i => i.id === +id);
