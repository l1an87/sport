import Page from './Test.page.vue';

export const routesTest = {
  path: '/test',
  component: Page,
  meta: {
    needAuth: true,
  },
  children: [
    {
      path: '/',
      component: () => import('./test.vue'),
      meta: {
        title: 'test',
      },
    },
  ],
};
