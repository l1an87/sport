<script>
import Store from '@/mixins/Store.vue';
import { getNews } from '@/modules/News/News.api';

export default {
  mixins: [Store],
  props: {
    id: Number,
  },
  data: () => ({
    item: null,
    loading: true,
  }),
  methods: {
    async init() {
      this.loading = true;
      this.item = await getNews(this.id);
      this.$store.dispatch('setTitle', this.item.title);
      this.loading = false;
    },
  },
  watch: {
    id() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div class="news-item">
    <v-card v-if="item">
      <v-card-text v-html="item.description"></v-card-text>
    </v-card>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<style lang="scss">
  .news-item {
    img {
      max-width: 100%;
    }
  }
</style>
