<script>
import { getNewsList } from '@/modules/News/News.api';
import ListItems from '@/components/List.vue';
import Loader from '@/components/Loader.vue';
import ItemComponent from './Item.component.vue';

export default {
  components: {
    ListItems,
    Loader,
    ItemComponent,
  },
  data: () => ({
    items: [],
    loading: true,
  }),
  methods: {
    async init() {
      this.items = [];
      this.loading = true;
      this.items = await getNewsList();
      this.loading = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div>
    <v-card>
      <ListItems
        :items="items"
        :size="50"
        :loading="loading"
        txt-no-entity="Новости отсутствуют"
      >
        <ItemComponent
          slot="item"
          slot-scope="{ item }"
          :item="item"
        />
      </ListItems>
    </v-card>
    <Loader
      :value="loading"
    />
  </div>
</template>
<style lang="scss">

</style>
