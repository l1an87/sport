<script>
import Store from '@/mixins/Store.vue';
import { getTaskBonus } from '@/modules/TaskBonus/TaskBonus.api';

export default {
  mixins: [
    Store,
  ],
  props: {
    statistic: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    star: getTaskBonus(1),
    medal: getTaskBonus(2),
    cup: getTaskBonus(3),
  }),
  computed: {
    trainings() {
      return this.statistic.reduce((acc, i) => acc + i.trainingsCount, 0);
    },
    stars() {
      return this.statistic.reduce((acc, i) => acc + i.stars, 0);
    },
    medals() {
      return this.statistic.reduce((acc, i) => acc + i.medals, 0);
    },
    cups() {
      return this.statistic.reduce((acc, i) => acc + i.cups, 0);
    },
  },
};
</script>
<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar color="grey" size="52">
        <v-img v-if="account$.avatar" :src="account$.avatar"></v-img>
        <v-icon v-if="!account$.avatar" dark>mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ account$.lastName }} {{ account$.firstName }}</v-list-item-title>
        <v-list-item-subtitle>{{ account$.teamName }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <template v-if="cups || stars || medals">
      <v-divider/>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Награды</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-flex>
            <v-chip class="ml-1" v-if="cups">
              {{ cups }}
              <v-icon size="18" class="ml-1">{{ cup.icon }}</v-icon>
            </v-chip>
            <v-chip class="ml-1" v-if="medals">
              {{ medals }}
              <v-icon size="18" class="ml-1">{{ medal.icon }}</v-icon>
            </v-chip>
            <v-chip class="ml-1" v-if="stars">
              {{ stars }}
              <v-icon size="18" class="ml-1">{{ star.icon }}</v-icon>
            </v-chip>
          </v-flex>
        </v-list-item-action>
      </v-list-item>
    </template>
    <v-divider/>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Тренировки</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-chip>
            {{ trainings }} шт
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<style lang="scss">

</style>
