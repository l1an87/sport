export const routesRegulations = {
  path: '/regulations',
  component: () => import('./Regulations.page.vue'),
  meta: {
    needAuth: true,
    title: 'Правила',
  },
};
