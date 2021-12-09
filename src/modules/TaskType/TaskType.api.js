const items = [
  {
    id: 1,
    name: 'Дальность дистанции',
    label: 'Дистанция',
    unit: 'км',
    fixed: 1,
  },
  {
    id: 2,
    name: 'Количество тренировок',
    label: 'Тренировок',
    unit: 'шт',
    fixed: 0,
  },
  {
    id: 3,
    name: 'Количество калории',
    label: 'Калорий',
    unit: 'ккал',
    fixed: 0,
  },
  {
    id: 4,
    name: 'Самый быстрый',
    label: 'Дистанция',
    unit: 'км',
    fixed: 1,
  },
];

export const getTaskTypeList = () => items.map(i => ({
  ...i,
  value: i.id,
  text: i.name,
}));

export const getTaskType = (id) => getTaskTypeList()
  .find(i => i.id === +id);
