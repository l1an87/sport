<script>
import Store from '@/mixins/Store.vue';
import { getActivity, hideActivity, showActivity } from '@/modules/Activity/Activity.api';
import MapComponent from './Map.component.vue';

export default {
  mixins: [Store],
  components: {
    MapComponent,
  },
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
      this.item = await getActivity(this.id);
      this.$store.dispatch('setTitle', this.item.name);
      this.loading = false;
    },
    hide() {
      this.loading = true;
      hideActivity(this.id)
        .finally(() => {
          this.init();
        });
    },
    show() {
      this.loading = true;
      showActivity(this.id)
        .finally(() => {
          this.init();
        });
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
  <div>
    <v-card v-if="item">
      <MapComponent
        v-if="item.points.length"
        :zoom="13"
        :points="item.points"
        height="50vh"
        width="100%"
      />
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.sport.text }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ item.start | dateMin}}, {{ item.start | dateTime }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip>
              {{ item.distance | toFixed(1) }} км
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Время тренировки</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip>
              {{ item.elapsedTime / 60 | toFixed(0) }} мин
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="item.movingTime"/>
        <v-list-item v-if="item.movingTime">
          <v-list-item-content>
            <v-list-item-title>Время в движении</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip>
              {{ item.movingTime / 60 | toFixed(0) }} мин
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="item.maxSpeed"/>
        <v-list-item v-if="item.maxSpeed">
          <v-list-item-content>
            <v-list-item-title>Максимальная скорость</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip>
              {{ item.maxSpeed | toFixed(1) }} км/ч
            </v-chip>
          </v-list-item-action>
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Средняя скорость</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip>
              {{ item.averageSpeed | toFixed(1) }} км/ч
            </v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div v-for="img in item.photos" :key="img.url">
        <v-img :src="img.url" max-height="50vh"></v-img>
      </div>
      <v-card-actions v-if="item.userId === account$.id">
        <v-btn v-if="!item.hidden" @click="hide" block color="primary">Скрыть тренировку</v-btn>
        <v-btn v-if="item.hidden" @click="show" block color="primary">Показать тренировку</v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<style lang="scss">

</style>
