import Vue from 'vue';
import Vuex from 'vuex';
import app from './app/App.store';
import setting from './setting';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    title: 'Система спорт',
    setting,
  },
  actions: {
    setTitle({ state }, title) {
      state.title = title;
    },
  },
  modules: {
    app,
  },
});

export default store;
