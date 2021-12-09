import Page from '@/app/AppRoute.page.vue';

export const routesTask = {
  path: '/task',
  component: Page,
  meta: {
    needAuth: true,
  },
  children: [
    {
      path: '/',
      component: () => import('./List/List.page.vue'),
      meta: {
        title: 'Задачи',
      },
    },
    {
      path: ':taskId/user/:userId',
      component: () => import('./User/User.page.vue'),
      props: true,
      meta: {
        title: 'Задачи',
      },
    },
    {
      path: ':taskId/:taskRuleId',
      component: () => import('./Item/Item.page.vue'),
      props: true,
      meta: {
        title: 'Задачи',
      },
    },
  ],
};
