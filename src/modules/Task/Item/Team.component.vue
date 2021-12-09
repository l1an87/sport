<script>
export default {
  props: {
    item: Object,
    type: Object,
  },
};
</script>
<template>
  <v-list-item
    @click="$emit('click', item)"
  >
      <v-list-item-content>
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ item.users.length | nameParticipant }}
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
