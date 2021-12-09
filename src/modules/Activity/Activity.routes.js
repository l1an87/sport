import Page from '@/app/AppRoute.page.vue';

export const routesActivity = {
  path: '/activity',
  component: Page,
  meta: {
    needAuth: true,
  },
  children: [
    {
      path: '/',
      component: () => import('./List/List.page.vue'),
      meta: {
        title: 'Мои тренировки',
      },
    },
    {
      path: ':activityId',
      component: () => import('./Item/Item.page.vue'),
      props: true,
      meta: {
        title: 'Мои тренировки',
      },
    },
  ],
};
