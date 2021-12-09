<script>
import api from '@/utils/api';
import FormComponent from './components/Form.vue';

export default {
  components: {
    FormComponent,
  },
  data: () => ({
    form: null,
    step: 1,
    loading: false,
  }),
  methods: {
    async init() {
      this.loading = true;
      const { data } = this.$store.state.app;
      this.registration.form = {
        ...data,
        hideActivitiesByDefault: data.hideActivitiesByDefault || false,
      };
      this.loading = false;
    },
    async submit() {
      this.loading = true;
      await api.post('account/me', this.form);
      this.loading = false;
      this.$store.dispatch('init');
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <v-app>
    <FormComponent
      :form="form"
      @submit="submit"
    />
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>
<style lang="scss">

</style>
