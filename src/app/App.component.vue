<script>
import LoadingComponent from './Loading/Loading.component.vue';
import LoginComponent from './Login/Login.component.vue';
import RegistrationComponent from './Registration/Registration.component.vue';
import LayoutComponent from './Layout/Layout.component.vue';
import NotAuth from './NotAuth/NotAuth.component.vue';

export default {
  components: {
    LoadingComponent,
    LoginComponent,
    RegistrationComponent,
    LayoutComponent,
    NotAuth,
  },
  data: () => ({}),
  computed: {
    state() {
      return this.$store.getters.state;
    },
  },
  mounted() {
    this.$store.dispatch('init');
  },
  render(h) {
    switch (this.state) {
      case 0:
        return h(LayoutComponent);
      default:
      case 1:
        return h(LoadingComponent);
      case 2:
        return h(LoginComponent);
      case 3:
        return h(RegistrationComponent);
      case 9:
        return h(NotAuth);
    }
  },
};
</script>
