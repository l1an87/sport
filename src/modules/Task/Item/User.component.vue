<script>
export default {
  props: {
    item: Object,
    taskId: [Number, String],
    type: Object,
  },
};
</script>
<template>
  <v-list-item
    :to="`/task/${taskId}/user/${item.userId}`"
  >
    <v-list-item-avatar>
      <v-img v-if="item.avatar" :src="item.avatar"></v-img>
      <v-icon v-if="!item.avatar" dark>mdi-account</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="mb-3">
        {{ item.lastName }}
        {{ item.firstName }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ item.organizationUnitName }}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action v-if="type">
      <v-chip>
        {{ item.progress | toFixed(type.fixed) }} {{ type.unit }}
      </v-chip>
    </v-list-item-action>
  </v-list-item>
</template>
<style lang="scss">

</style>
