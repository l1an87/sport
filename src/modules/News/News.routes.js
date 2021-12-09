import Page from '@/app/AppRoute.page.vue';

export const routesNews = {
  path: '/news',
  component: Page,
  meta: {
    needAuth: true,
  },
  children: [
    {
      path: '/',
      component: () => import('./List/List.page.vue'),
      meta: {
        title: 'Новости',
      },
    },
    {
      path: ':newsId',
      component: () => import('./Item/Item.page.vue'),
      props: true,
      meta: {
        title: 'Новости',
      },
    },
  ],
};
