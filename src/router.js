import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '@/store';
import { routesDashboard } from '@/modules/Dashboard/Dashboard.routes';
import { routesActivity } from '@/modules/Activity/Activity.routes';
import { routesTask } from '@/modules/Task/Task.routes';
import { routesNews } from '@/modules/News/News.routes';
import { routesRegulations } from '@/modules/Regulations/Regulations.routes';
import { routesContact } from '@/modules/Contact/Regulations.routes';
import { routesChat } from '@/modules/Chat/Chat.routes';
import { routesRating } from '@/modules/Rating/Rating.routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    routesDashboard,
    routesActivity,
    routesTask,
    routesNews,
    routesRegulations,
    routesContact,
    routesChat,
    routesRating,
    {
      path: '/*',
      component: () => import('@/modules/PageNotFind/PageNotFind.vue'),
      meta: {
        needAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const meta = to.matched.reduce((acc, route) => ({
    ...acc,
    ...route.meta,
  }), {});
  store.dispatch('needAuth', meta.needAuth);
  store.dispatch('setTitle', meta.title || '');
  next();
});

export default router;
