export const routesDashboard = {
  path: '/dashboard',
  component: () => import('./Dashboard.page.vue'),
  meta: {
    needAuth: true,
    title: 'Личный кабинет',
  },
};
