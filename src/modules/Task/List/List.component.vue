<script>
import ListItems from '@/components/List.vue';
import Loader from '@/components/Loader.vue';
import { getTaskSportList, acceptTask } from '@/modules/Task/Task.api';
import ItemComponent from './Item.component.vue';

export default {
  components: {
    ListItems,
    ItemComponent,
    Loader,
  },
  props: {
    sport: [String, Number],
    month: [String, Number],
    year: [String, Number],
  },
  data: () => ({
    items: [],
    loading: true,
  }),
  methods: {
    async init() {
      this.loading = true;
      this.items = await getTaskSportList({
        sport: +this.sport,
        month: +this.month,
        year: +this.year,
      });
      this.loading = false;
    },
    handlerAccept(item) {
      this.loading = true;
      acceptTask(item.rule.id)
        .then(() => {
          this.init();
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    sport() {
      this.init();
    },
    month() {
      this.init();
    },
    year() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <div>
    <ListItems
      :items="items"
      :size="50"
      :loading="loading"
      keyName="key"
      txt-no-entity="Задачи отсутствуют"
    >
      <ItemComponent
        slot="item"
        slot-scope="{ item }"
        :item="item"
        @accept="handlerAccept"
      />
    </ListItems>
    <Loader
      :value="loading"
    />
  </div>
</template>
<style lang="scss">

</style>
