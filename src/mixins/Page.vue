<script>
import StoreMixin from './Store.vue';

export default {
  mixins: [
    StoreMixin,
  ],
  data: () => ({
    title: '',
  }),
  watch: {
    title(val, old) {
      if (old) {
        this.$store.dispatch('setTitle', val || '');
      } else if (val) {
        this.$store.dispatch('setTitle', val);
      }
    },
  },
  mounted() {
    if (this.title) {
      this.$store.dispatch('setTitle', this.title);
    }
  },
};
</script>
<template>
  <router-view></router-view>
</template>
