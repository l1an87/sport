<script>
import { getTaskBonus } from '@/modules/TaskBonus/TaskBonus.api';

export default {
  props: {
    item: Object,
  },
  data: () => ({
    star: getTaskBonus(1),
    medal: getTaskBonus(2),
    cup: getTaskBonus(3),
  }),
};
</script>
<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img v-if="item.avatar" :src="item.avatar"></v-img>
      <v-icon v-if="!item.avatar" dark>mdi-account</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="mb-3">
        {{ item.userLastName }}
        {{ item.userFirstName }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ item.organizationUnitName }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <div v-if="item.cups">
        {{item.cups}}
        <v-icon dense>{{cup.icon}}</v-icon>
      </div>
      <div v-if="item.medals">
        {{item.medals}}
        <v-icon dense>{{medal.icon}}</v-icon>
      </div>
      <div v-if="item.stars">
        {{item.stars}}
        <v-icon dense>{{star.icon}}</v-icon>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>
<style lang="scss">

</style>
