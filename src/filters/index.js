import dateMin from './dateMin';
import dateTime from './dateTime';
import toFixed from './toFixed';
import users from './users';
import padStart from './padStart';
import prettify from './prettify';
import nameParticipant from './nameParticipant';
import dateYear from './dateYear';
import dateMonth from './dateMonth';

export default {
  install(Vue) {
    Vue.use(dateMin);
    Vue.use(dateTime);
    Vue.use(toFixed);
    Vue.use(users);
    Vue.use(padStart);
    Vue.use(prettify);
    Vue.use(nameParticipant);
    Vue.use(dateYear);
    Vue.use(dateMonth);
  },
};
