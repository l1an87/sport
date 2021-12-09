import Page from '@/app/AppRoute.page.vue';

export const routesRating = {
  path: '/rating',
  component: Page,
  meta: {
    needAuth: true,
  },
  children: [
    {
      path: '/',
      component: () => import('./Rating.page.vue'),
      meta: {
        title: 'Рейтинг',
      },
    },
  ],
};
