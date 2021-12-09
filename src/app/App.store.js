import api from '@/utils/api';

export default {
  state: {
    isInit: false,
    isAuth: false,
    isAdmin: false,
    isVisitor: false,
    isNeedData: false,
    isNeedAuth: false,
    account: {
      id: 0,
      firstName: '',
      lastName: '',
      middleName: '',
      gender: 1,
      email: '',
      avatar: '',
      teamId: 1,
      teamName: '',
    },
    data: null,
    statistic: {},
  },
  mutations: {
    set(state, data = {}) {
      state.data = data || {};
      state.account.id = data?.userId || 0;
      state.account.firstName = data?.firstName || '';
      state.account.lastName = data?.lastName || '';
      state.account.middleName = data?.middleName || '';
      state.account.gender = data?.gender || 1;
      state.account.email = data?.email || '';
      state.account.avatar = data?.avatar || '';
      state.account.teamId = data?.organizationUnitId || 0;
      state.account.teamName = data?.organizationUnit || '';

      state.isAdmin = data?.admin || false;
      state.isVisitor = data?.visitor || false;
      state.isAuth = !!state.account.id || state.isVisitor || false;
      state.isNeedData = data?.needToConfirmPersonalData || false;
    },
  },
  actions: {
    init: ({ state, commit }) => api
      .get('account/me')
      .then((data) => {
        state.isAuth = true;
        commit('set', data);
        return state;
      })
      .finally(() => {
        state.isInit = true;
      }),
    login: ({ state, dispatch }, form = {}) => {
      state.isAuth = false;
      return api
        .post('account/login', form)
        .then(() => dispatch('init'));
    },
    logout({ state, commit }) {
      return api
        .post('account/logout')
        .finally(() => {
          state.isAuth = false;
          commit('set', {});
          return state;
        });
    },
    needAuth({ state }, value) {
      state.isNeedAuth = !!value;
    },
    reData({ state, commit }) {
      state.isNeedAuth = false;
      setTimeout(() => {
        commit('set', state.data);
      });
    },
  },
  getters: {
    state: (state) => {
      if (!state.isInit) return 1;
      if (state.isNeedAuth) {
        if (!state.isAuth) return 2;
        if (state.isNeedData) return 3;
        return 0;
      }
      return 9;
    },
  },
};
