import Page from '@/app/AppRoute.page.vue';

export const routesChat = {
  path: '/chat',
  component: Page,
  meta: {
    needAuth: true,
  },
  children: [
    {
      path: '/',
      component: () => import('./Chat.page.vue'),
      meta: {
        title: 'Чат',
      },
    },
  ],
};
