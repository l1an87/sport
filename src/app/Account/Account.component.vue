<script>
import api from '@/utils/api';
import FormComponent from './components/Form.vue';

export default {
  components: {
    FormComponent,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    form: null,
    loading: false,
  }),
  methods: {
    async init() {
      this.loading = true;
      await this.initRegistration();
      this.loading = false;
    },
    async initRegistration() {
      const { data } = this.$store.state.app;
      this.form = {
        ...data,
        hideActivitiesByDefault: data.hideActivitiesByDefault || false,
      };
      return this;
    },
    async submit() {
      this.loading = true;
      await this.submitRegistration();
      this.loading = false;
      this.$store.dispatch('init');
      this.$emit('input', false);
    },
    async submitRegistration() {
      await api.post('account/me', this.form);
      return this;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div>
    <FormComponent
      :form="form"
      @submit="submit"
      @close="$emit('input', false)"
    />
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<style lang="scss">

</style>
