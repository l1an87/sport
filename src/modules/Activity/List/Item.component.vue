<script>
export default {
  props: {
    item: Object,
  },
};
</script>
<template>
  <v-list-item
    :to="`/activity/${item.id}`"
  >
    <v-list-item-avatar :color="item.sport.color">
      <v-icon dark>{{ item.sport.icon }}</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="mb-3">
        {{ item.name }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ item.start | dateMin }},
        {{ item.start | dateTime }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-chip>
        {{ item.distance | toFixed(1) }} км
      </v-chip>
    </v-list-item-action>
  </v-list-item>
</template>
<style lang="scss">

</style>
