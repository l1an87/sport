export const routesContact = {
  path: '/contact',
  component: () => import('./Contact.page.vue'),
  meta: {
    needAuth: true,
    title: 'Контакты организаторов',
  },
};
