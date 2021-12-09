let state = new Map();

export const clearState = () => {
  state = new Map();
};

export const clearStateKey = (key) => {
  if (!state.get(key)) {
    return;
  }
  state.delete(key);
};

export const getState = (key) => {
  if (!state[key]) {
    state[key] = {
      api: null,
      time: 0,
    };
  }
  return {
    api(api) {
      const lState = state[key];
      if (!lState.api || lState.time < Date.now()) {
        lState.time = Date.now() + (30 * 60000);
        lState.api = api();
      }
      return lState.api;
    },
  };
};
