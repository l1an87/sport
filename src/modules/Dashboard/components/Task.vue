<script>
import ListItems from '@/components/List.vue';
import Loader from '@/components/Loader.vue';
import { getTaskMyList } from '@/modules/Task/Task.api';
import ItemComponent from '@/modules/Task/List/Item.component.vue';

export default {
  components: {
    ListItems,
    ItemComponent,
    Loader,
  },
  data: () => ({
    tasks: [],
    competitions: [],
    tab: 0,
    loading: true,
  }),
  methods: {
    async init() {
      this.loading = true;
      const { tasks, competitions } = await getTaskMyList();
      this.tasks = tasks;
      this.competitions = competitions;
      this.loading = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<template>
  <v-card class="dashboard-task">
    <v-tabs
      v-model="tab"
      background-color="transparent"
      grow
      :show-arrows="false"
      hide-slider
    >
      <v-tab>Задачи на сегодня</v-tab>
      <v-tab>Соревнования</v-tab>
    </v-tabs>
    <v-divider/>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ListItems
          :items="tasks"
          :size="50"
          :loading="loading"
          keyName="key"
          txt-no-entity="Задачи отсутствуют"
        >
          <ItemComponent
            slot="item"
            slot-scope="{ item }"
            :item="item"
          />
        </ListItems>
      </v-tab-item>
      <v-tab-item>
        <ListItems
          :items="competitions"
          :size="50"
          :loading="loading"
          keyName="key"
          txt-no-entity="Соревнования отсутствуют"
        >
          <ItemComponent
            slot="item"
            slot-scope="{ item }"
            :item="item"
          />
        </ListItems>
      </v-tab-item>
    </v-tabs-items>
    <v-divider/>
    <v-card-text>
      <v-btn to="/task" color="primary" block>Выбрать задачу</v-btn>
    </v-card-text>
    <Loader
      :value="loading"
    />
  </v-card>
</template>
<style lang="scss">
  .dashboard-task {
    .v-slide-group__prev,
    .v-slide-group__next {
      display: none !important;
    }
  }
</style>
